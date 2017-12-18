# kaspersky

> The implementation of the [front-end programming test](./Задание%20(Frontend).docx).

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Notes

1. **The project setup** might seem inappropriately complex for such a problem. Nevertheless, it's generated with a single
CLI command, and Vue is very competitive for small to medium size web apps.

    ```bash
    vue init webpack kaspersky
    ``` 

1. **The dataset** is [auto-generated](./scripts/generate-dataset.js) and contains 1000 employees.

1. **[`employees`](./src/data/employees.js)** are modeled a-la [RethinkDB change-feed](https://www.rethinkdb.com/api/javascript/changes)
to enable a reactive programming model.

    > an infinite stream of objects representing changes to the query’s results as they occur

1. **[`order`](./src/data/order.js)** is computed once for an `employees` dataset.

    *Note to improve*: instead of total reordering of [`employees.val`](./src/data/employees.js#L26) react on
    [`employees.changes`](./src/data/employees.js#L21) and amend previous ordering.

1. **[`search`](./src/data/search.js)** builds an `invertedIndex` for an `employees` dataset.

    *Note to improve*: instead of re-building the `invertedIndex` patch the previous one, more fully utilizing the provided
    [`{newVal, oldVal} of changes`](./src/data/search.js#L9).
    
    *Note to improve*: utilize stemming for a more precise search.

1. [EmployeeList](./src/components/pages/EmployeeList.vue#L34) is rendered once for an `employees` dataset.

    `order` reactively sets the FlexBox [`order`](./src/components/pages/EmployeeList.vue#L39) property for an `.employee`.

    `search` reactively sets the [`[data-excluded]`](./src/components/pages/EmployeeList.vue#L37) attribute for an `.employee`.

1. **Item selection and board view** are not implemented due to limited time budget and de-prioritized in favor of
fast sorting and filtering of the dataset.
