import Animal from '../schemas/animal.schema.js';

export const getAnimals = async (req, res) => {
  const { page, rowsPerPage, orderBy, order } = req.body;
  try {
    let sort = {};
    if (req.query.sortBy) {
      const str = req.query.sortBy.split(':');
      if (str[0] !== 'null') {
        sort[str[0]] = str[1] === 'desc' ? -1 : 1;
      } else {
        sort = { createdAt: -1 };
      }
    }
    const animals = await Animal.find({ is_active: true })
      .sort(sort)
      .skip(page * rowsPerPage)
      .limit(rowsPerPage);

    const response = {
      rowsPerPage,
      page: page + 1,
      orderBy,
      order,
      data: animals,
    };

    if (!response) return res.status(204).json();

    res.status(200).json(response);
  } catch (e) {
    res.json(e.message);
  }
};
export const createAnimal = async (req, res) => {
  const typeAnimal = req.body.type;
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
    res.json(e.message);
  }
};

export const deleteAnimal = async (req, res) => {
  try {
    const deletedAnimal = await Animal.findByIdAndUpdate(
      req.params.id,
      { is_active: false },
      {
        new: true,
      }
    );
    if (!deletedAnimal) return res.status(204).json();

    res.status(200).json(deletedAnimal);
  } catch (e) {
    res.json(e.message);
  }
};

export const editAnimals = async (req, res) => {
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedAnimal) return res.status(204).json();
    res.status(200).json(updatedAnimal);
  } catch (e) {
    res.json(e.message);
  }
};
export const getAnimalById = async (req, res) => {
  const change = req.body;
  try {
    const requestedAnimal = await Animal.findById(req.params.id);
    if (!requestedAnimal) return res.status(204).json();
    res.status(200).json(requestedAnimal);
  } catch (e) {
    res.json(e.message);
  }
};
