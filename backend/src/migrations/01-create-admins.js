'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('admins', {
            id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
            nom: { type: Sequelize.STRING(150), allowNull: false },
            email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
            mot_de_passe: { type: Sequelize.STRING(255), allowNull: false },
            role: { type: Sequelize.ENUM('admin', 'editeur'), defaultValue: 'editeur' },
            est_actif: { type: Sequelize.BOOLEAN, defaultValue: true },
            created_at: { type: Sequelize.DATE, allowNull: false },
            updated_at: { type: Sequelize.DATE, allowNull: false },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('admins');
    },
};
