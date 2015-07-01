module.exports = [
  '$localStorage',
  ($localStorage) => {
    $localStorage.trainings = !!$localStorage.trainings ? $localStorage.trainings : [];

    return {
      create: (data) => {
        data.id = $localStorage.trainings.length;
        $localStorage.trainings.push(data);
      },
      deleteById: (id) => {
        return this.remove($localStorage.trainings[parseInt(id, 10) - 1]);
      },
      remove: (training) => {
        training.removed = true;
        training.changed = true;
        return true;
      },
      getActives: () => {
        return $localStorage.trainings.filter((el) => {
          return !el.removed && moment().isBefore(el.until);
        });
      },
      getAll: () => {
        return $localStorage.trainings;
      }
    };
  }
];
