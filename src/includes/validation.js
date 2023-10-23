import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate';

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
} from '@vee-validate/rules';

import i18n from '@/includes/i18n'; // Import your i18n instance

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('AlphaSpaces', AlphaSpaces);
    defineRule('email', email);
    defineRule('min_value', min_value);
    defineRule('max_value', max_value);
    defineRule('pass_mismatch', confirmed);
    defineRule('alpha', alpha);
    defineRule('is_not', is_not);
    defineRule('country_excluded', is_not);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: i18n.global.t('validation.required', { field: i18n.global.t(ctx.field) }),
          min: i18n.global.t('validation.min', { field: i18n.global.t(ctx.field) }),
          max: i18n.global.t('validation.max', { field: i18n.global.t(ctx.field) }),
          AlphaSpaces: i18n.global.t('validation.AlphaSpaces', { field: i18n.global.t(ctx.field) }),
          email: i18n.global.t('validation.email', { field: i18n.global.t(ctx.field) }),
          min_value: i18n.global.t('validation.min_value', { field: i18n.global.t(ctx.field) }),
          max_value: i18n.global.t('validation.max_value', { field: i18n.global.t(ctx.field) }),
          pass_mismatch: i18n.global.t('validation.pass_mismatch', { field: i18n.global.t(ctx.field) }),
          is_not: i18n.global.t('validation.is_not', { field: i18n.global.t(ctx.field) }),
          tos: i18n.global.t('validation.tos', { field: i18n.global.t('register.accept') }),
          country_excluded: i18n.global.t('validation.country_excluded', { field: i18n.global.t(ctx.field) }),
        };
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : i18n.global.t('validation.default', { field: i18n.global.t(ctx.field) });

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnModelUpdate: true,
      validateOnInput: true,
    });
  },
};
