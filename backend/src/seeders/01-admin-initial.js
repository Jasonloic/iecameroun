'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('admins', [{
            nom: 'Super Admin',
            email: process.env.ADMIN_EMAIL || 'admin@iecameroun.cm',
            mot_de_passe: await bcrypt.hash(process.env.ADMIN_INIT_PASS || 'ChangeMe123!', 12),
            role: 'admin',
            est_actif: true,
            created_at: new Date(),
            updated_at: new Date(),
        }]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete('admins', {
            email: process.env.ADMIN_EMAIL || 'admin@iecameroun.cm',
        });
    },
};