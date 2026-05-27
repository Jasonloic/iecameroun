'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('documents', {
            id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
            titre: { type: Sequelize.STRING(255), allowNull: false },
            description: { type: Sequelize.TEXT, allowNull: true },
            type: { type: Sequelize.ENUM('rapport', 'note', 'autre'), defaultValue: 'autre' },
            chemin_fichier: { type: Sequelize.STRING(500), allowNull: false },
            nom_fichier_original: { type: Sequelize.STRING(255), allowNull: false },
            taille_fichier: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
            mime_type: { type: Sequelize.STRING(100), allowNull: false },
            est_public: { type: Sequelize.BOOLEAN, defaultValue: true },
            telechargements: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0 },
            created_at: { type: Sequelize.DATE, allowNull: false },
            updated_at: { type: Sequelize.DATE, allowNull: false },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('documents');
    },
};