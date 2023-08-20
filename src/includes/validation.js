import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'

import {
  required,
  min,
  max,
  alpha_spaces as AlphaSpaces,
  email,
  min_value,
  max_value,
  confirmed,
  alpha,
  is_not
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('AlphaSpaces', AlphaSpaces)
    defineRule('email', email)
    defineRule('min_value', min_value)
    defineRule('max_value', max_value)
    defineRule('pass_mismatch', confirmed)
    defineRule('alpha', alpha)
    defineRule('is_not', is_not)
    defineRule('country_excluded', is_not)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required`,
          min: `The field ${ctx.field} is less than it suppose`,
          max: `The field ${ctx.field} is more than it suppose `,
          AlphaSpaces: `The field ${ctx.field} shouldn only contient alphabitical caracteres `,
          email: `The field ${ctx.field} should be a valid email`,
          min_value: `The field ${ctx.field} is too low`,
          max_value: `The field ${ctx.field} is too high`,
          pass_mismatch: `The field ${ctx.field} mismatch with password `,
          is_not: `The field ${ctx.field} can't support this value`,
          tos: `You must accept the terms `,
          country_excluded: `The field ${ctx.field} can't accepte this country`
        }
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is not valid .`

        return message
      },
      validateOnBlur :true ,
      validateOnChange : true ,
      validateOnModelUpdate : true,
      validateOnInput : true,
    

    })
  }
}
