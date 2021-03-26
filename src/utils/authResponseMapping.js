export const authResponseMapping = message => {
  switch (message) {
    case 'User with provided login is already exists':
      return 'Пользователь с таким именем уже существует'
    case 'Bad auth parameters':
      return 'Неправильный логин или пароль'
    default:
      return 'Произошла ошибка попробуйте снова'
  }
}
