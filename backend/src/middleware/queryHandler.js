export default (req, res, next) => {
  // Yardımcı fonksiyon: Güvenli JSON parse
  const parseJSON = (value) => {
    try {
      return typeof value === "string" ? JSON.parse(value) : value || {};
    } catch {
      return {};
    }
  };

  // ### Filtering ###
  const filter = parseJSON(req.query?.filter);

  // ### Searching ###
  const rawSearch = parseJSON(req.query?.search);
  const search = {};
  for (const key in rawSearch) {
    search[key] = { $regex: rawSearch[key], $options: "i" }; // i: case insensitive
  }

  // ### Sorting ###
  const sort = parseJSON(req.query?.sort);

  // ### Pagination ###
  let limit = Number(req.query?.limit);
  limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE || 20);

  let page = Number(req.query?.page);
  page = page > 0 ? page - 1 : 0;

  let skip = Number(req.query?.skip);
  skip = skip > 0 ? skip : page * limit;

  // ### Modern Query Methods ###
  res.getModelList = async (
    Model,
    customFilter = {},
    populate = null,
    select = null
  ) => {
    return await Model.find({ ...filter, ...search, ...customFilter })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate(populate)
      .select(select);
  };

  res.getModelListDetails = async (Model, customFilter = {}) => {
    const totalRecords = await Model.countDocuments({
      ...filter,
      ...search,
      ...customFilter,
    });

    const details = {
      filter,
      search,
      sort,
      skip,
      limit,
      page,
      pages: {
        previous: page > 0 ? page : false,
        current: page + 1,
        next: page + 2,
        total: Math.ceil(totalRecords / limit),
      },
      totalRecords,
    };

    if (details.pages.next > details.pages.total) details.pages.next = false;
    if (totalRecords <= limit) details.pages = false;

    return details;
  };

  next();
};
