export default [
     {
        path: '/detail',
        getComponent: (location, cb) => {
            require.ensure([], (require) => {
                cb(null, require('./detail/Detail'));
            });
        },
    },
];
