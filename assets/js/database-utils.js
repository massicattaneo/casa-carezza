function getDatabase() {
    var database = firebase.database();
    return Promise.all([
        new Promise(function (resolve) {
            firebase.database().ref('users/').on('value', function (snapshot) {
                resolve(snapshot.val());
            });
        }),
        new Promise(function (resolve) {
            firebase.database().ref('periods/').on('value', function (snapshot) {
                resolve(snapshot.val());
            });
        }),
        new Promise(function (resolve) {
            firebase.database().ref('flats/').on('value', function (snapshot) {
                resolve(snapshot.val());
            });
        }),
        new Promise(function (resolve) {
            firebase.database().ref('weeks/').on('value', function (snapshot) {
                var ret = [];
                snapshot.forEach(function (i) {
                    ret.push(Object.assign({ key: i.key }, i.val()));
                });
                resolve(ret);
            });
        })
    ]).then(function (values) {
        var users = values[0];
        var periods = values[1];
        var flats = values[2];
        var weeks = values[3];
        weeks.forEach(function (week) {
            week.rent = week.rent || [];
            week.exchange = week.exchange || [];
        });
        return { users: users, periods: periods, flats: flats, weeks: weeks };
    });
}
