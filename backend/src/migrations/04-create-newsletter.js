'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('newsletter_abonnes', {
            id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
            email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
            est_actif: { type: Sequelize.BOOLEAN, defaultValue: true },
            token: { type: Sequelize.STRING(255), allowNull: false, unique: true },
            created_at: { type: Sequelize.DATE, allowNull: false },
            updated_at: { type: Sequelize.DATE, allowNull: false },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('newsletter_abonnes');
    },
};