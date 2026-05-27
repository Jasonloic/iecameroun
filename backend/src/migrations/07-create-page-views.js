'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('page_views', {
            id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
            visitor_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                references: { model: 'visitors', key: 'id' },
                onDelete: 'CASCADE',
            },
            path: { type: Sequelize.STRING(500), allowNull: false },
            referrer: { type: Sequelize.STRING(500), allowNull: true },
            created_at: { type: Sequelize.DATE, allowNull: false },
            updated_at: { type: Sequelize.DATE, allowNull: false },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('page_views');
    },
};