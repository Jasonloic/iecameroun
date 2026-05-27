'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('actualites', {
            id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
            titre: { type: Sequelize.STRING(255), allowNull: false },
            contenu: { type: Sequelize.TEXT('long'), allowNull: false },
            resume: { type: Sequelize.STRING(500), allowNull: false },
            image_cover: { type: Sequelize.STRING(500), allowNull: true },
            categorie: { type: Sequelize.STRING(100), allowNull: false },
            est_publie: { type: Sequelize.BOOLEAN, defaultValue: false },
            vues: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0 },
            auteur: { type: Sequelize.STRING(150), allowNull: false },
            created_at: { type: Sequelize.DATE, allowNull: false },
            updated_at: { type: Sequelize.DATE, allowNull: false },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('actualites');
    },
};