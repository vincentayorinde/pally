const User = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false,
            },
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: false,
            },
        },
    })
    return User
}

export default User
