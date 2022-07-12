import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const { Schema, model } = mongoose;
const animalSchema = new Schema(
  {
    id_senasa: {
      type: String,
      required: [true, 'El campo id_senasa es requerido'],
      minLength: [
        16,
        'La cantidad exacta de caracteres debe ser 16 (dieciséis)',
      ],
      maxLength: [
        16,
        'La cantidad exacta de caracteres debe ser 16 (dieciséis)',
      ],
      unique: true,
    },
    type: {
      type: String,
      enum: {
        values: ['Novillo', 'Toro', 'Vaquillona'],
        message:
          '{VALUE} no es compatible. El valor debe ser "Novillo","Toro" o "Vaquillona".',
      },
      required: [true, 'El campo type es requerido'],
    },
    weight: {
      type: Number,
      required: [true, 'El campo weight es requerido'],
    },
    name: {
      type: String,
      maxLength: [200, 'La cantidad máxima de caracteres es 200 (doscientos)'],
      required: [true, 'El campo name es requerido'],
    },
    device: {
      type: String,
      enum: {
        values: ['COLLAR', 'CARAVANA'],
        message:
          '{VALUE} no es compatible. El valor debe ser "COLLAR" o "CARAVANA".',
      },
      required: [true, 'El campo device es requerido'],
    },
    device_number: {
      type: String,
      minLength: [8, 'La cantidad exacta de caracteres debe ser 8 (ocho)'],
      maxLength: [8, 'La cantidad exacta de caracteres debe ser 8 (ocho)'],
      required: [true, 'El campo device_number es requerido'],
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

animalSchema.plugin(uniqueValidator);

export default model('Animal', animalSchema);
