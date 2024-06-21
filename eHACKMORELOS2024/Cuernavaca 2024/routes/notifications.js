const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('../config/nodemailer');

// Enviar notificación
router.post('/notify', async (req, res) => {
    const { userId, message } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const mailOptions = {
            from: 'your-email@example.com',
            to: user.email,
            subject: 'Alerta de Consumo de Energía',
            text: message
        };

        nodemailer.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error al enviar el correo', error });
            }

            res.json({ message: 'Notificación enviada con éxito' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al enviar la notificación', error });
    }
});

module.exports = router;
