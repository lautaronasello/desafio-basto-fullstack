import Animal from '../../../database/schemas/animal.schema.js';

export const getAnimals = async (req, res) => {
  const { page, rowsPerPage, orderBy, order } = req.body;
  try {
    let sort = {};
    if (req.query.sortBy) {
      //Divides query on column and orderBy
      const str = req.query.sortBy.split(':');
      if (str[0] !== 'null') {
        sort[str[0]] = str[1] === 'desc' ? -1 : 1;
      } else {
        sort = { createdAt: -1 };
      }
    }
    //Filters by active animals
    const animals = await Animal.find({ is_active: true })
      .sort(sort)
      .skip(page * rowsPerPage)
      .limit(rowsPerPage);

    //Brings all animals for total rows pagination
    const totalAnimals = await Animal.find({ is_active: true });

    const response = {
      rowsPerPage,
      page: page + 1,
      orderBy,
      order,
      totalRows: totalAnimals.length,
      rows: animals,
    };
    if (!response) return res.status(204).json();

    res.status(200).json(response);
  } catch (e) {
    if ((e.name = 'ValidatorError')) {
      res.status(409).json(e.message);
    } else {
      res.status(500).json(e);
    }
  }
};

export const getAnimalSearch = async (req, res) => {
  const search = req.body.search;
  try {
    const requestedAnimal = await Animal.find(
      { $text: { $search: search } },
      { score: { $meta: 'textScore' } }
    );
    if (!requestedAnimal) return res.status(204).json([]);
    const response = {
      totalRows: requestedAnimal.length,
      rows: requestedAnimal,
    };
    res.status(200).json(response);
  } catch (e) {
    res.json(e);
  }
};

export const createAnimal = async (req, res, next) => {
  const typeAnimal = req.body.type;
  //Change animal type to format needed
  const typeAnimalFormatted =
    typeAnimal.charAt(0).toUpperCase() + typeAnimal.slice(1);
  const requestBody = {
    ...req.body,
    device: req.body.device.toUpperCase(),
    type: typeAnimalFormatted,
  };

  try {
    const newAnimal = new Animal(requestBody);
    const savedAnimal = await newAnimal.save();
    res.status(200).json(savedAnimal);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const deleteAnimal = async (req, res) => {
  try {
    const deletedAnimal = await Animal.findByIdAndUpdate(
      req.params.id,
      //Logic delete
      { is_active: false },
      {
        new: true,
      }
    );
    if (!deletedAnimal) return res.status(204).json();

    res.status(200).json(deletedAnimal);
  } catch (e) {
    res.json(e);
  }
};

export const editAnimals = async (req, res, next) => {
  try {
    if (
      req.body.id_senasa.length !== 16 ||
      req.body.device_number.length !== 8 ||
      req.body.name.length > 200
    ) {
      throw new Error('Error validación cantidad de caracteres');
    } else {
      const updatedAnimal = await Animal.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (!updatedAnimal) return res.status(204).json();
      res.status(200).json(updatedAnimal);
    }
  } catch (e) {
    res.json(e.message);
  }
};

export const getAnimalById = async (req, res) => {
  try {
    const requestedAnimal = await Animal.findById(req.params.id);
    if (!requestedAnimal) return res.status(204).json([]);
    res.send(requestedAnimal);
  } catch (e) {
    res.json(e.message);
  }
};
