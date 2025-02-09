import Joi from "joi";

const postCustomerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email harus valid.",
      "string.empty": "Email tidak boleh kosong.",
    }),
  password: Joi.string()
    .pattern(new RegExp(/^.{8,255}$/))
    .required()
    .messages({
      "string.pattern.base": "Password minimal 8 karakter.",
      "string.empty": "Password tidak boleh kosong.",
    }),
  confirm_password: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Konfirmasi password harus sama dengan password.",
    "any.required": "Konfirmasi password diperlukan.",
  }),
  name: Joi.string().min(1).max(120).required().messages({
    "string.empty": "Nama tidak boleh kosong.",
  }),
  address: Joi.string().min(1).max(255).required().messages({
    "string.empty": "Alamat tidak boleh kosong.",
  }),
  telephone: Joi.string().pattern(new RegExp(/^\d+$/)).required().messages({
    "string.pattern.base": "Telepon hanya boleh berisi angka.",
    "string.empty": "Nomor telepon tidak boleh kosong.",
  }),
}).with("password", "confirm_password");

export const validateCustomer = (formData) => {
  const { error } = postCustomerSchema.validate(formData, { abortEarly: false });

  if (error) {
    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
    return errors;
  }
  return null;
};
