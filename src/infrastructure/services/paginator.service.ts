export function paginator (items:any, page: number = 1, perPage: number = 10) {
    let offset = (page - 1) * perPage;

    let i = 1;
    items.forEach((e: any) => {
        e["index"] = i++;
    });

    let paginatedItems = items.slice(offset).slice(0, perPage);
    let totalPages = Math.ceil(items.length / perPage);

    return {
      page: page,
      item: paginatedItems[0]?.index || 0,
      itemOf: paginatedItems[paginatedItems.length-1]?.index || 0,
      perPage: perPage,
      prePage: page - 1 ? page - 1 : null,
      nextPage: (totalPages > page) ? page + 1 : null,
      total: items.length,
      totalPages: totalPages,
      data: paginatedItems
    };
}