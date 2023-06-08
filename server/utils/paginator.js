// Pagination Middleware

let paginator = (req, res, next) => {
    const size =
        parseInt(req.query.size) !== NaN ? parseInt(req.query.size) : 10;
    const page =
        parseInt(req.query.page) !== NaN ? parseInt(req.query.page) : 1;

    let limit;
    let offset;

    if (isNaN(page) || isNaN(size)) {
        next({
            message: "Requires valid page and size params",
        });
    } else {
        if (page === 0 && size === 0) {
            limit = null;
            offset = 0;
        } else {
            if (size > 200) {
                size = 200;
            }
            limit = size;
            offset = size * (page - 1);
        }
    }

    req.pagination = {
        page,
        size,
        limit,
        offset,
    };

    next();
};

module.exports = paginator;
