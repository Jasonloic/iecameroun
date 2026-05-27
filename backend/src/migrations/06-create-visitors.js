'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('visitors', {
            id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
            ip_address: { type: Sequelize.STRING(45), allowNull: false },
            user_agent: { type: Sequelize.STRING(500), allowNull: true },
            pays: { type: Sequelize.STRING(100), allowNull: true },
            ville: { type: Sequelize.STRING(100), allowNull: true },
            region: { type: Sequelize.STRING(100), allowNull: true },
            fingerprint: { type: Sequelize.STRING(64), allowNull: true },
            created_at: { type: Sequelize.DATE, allowNull: false },
            updated_at: { type: Sequelize.DATE, allowNull: false },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('visitors');
    },
};