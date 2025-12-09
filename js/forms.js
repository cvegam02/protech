// ============================================
// FORM HANDLING
// ============================================

(function() {
    'use strict';
    
    function showMessage(message, type) {
        const messageContainer = document.getElementById('formMessage');
        if (!messageContainer) return;
        
        // Limpiar mensajes anteriores
        messageContainer.className = 'form-message';
        messageContainer.textContent = '';
        
        // Agregar clase según el tipo
        if (type === 'success') {
            messageContainer.classList.add('form-message-success');
            messageContainer.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            `;
        } else if (type === 'error') {
            messageContainer.classList.add('form-message-error');
            messageContainer.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
            `;
        }
        
        // Mostrar el mensaje con animación
        messageContainer.style.display = 'block';
        messageContainer.style.opacity = '0';
        setTimeout(() => {
            messageContainer.style.opacity = '1';
        }, 10);
        
        // Scroll suave al mensaje
        messageContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function hideMessage() {
        const messageContainer = document.getElementById('formMessage');
        if (messageContainer) {
            messageContainer.style.opacity = '0';
            setTimeout(() => {
                messageContainer.style.display = 'none';
                messageContainer.className = 'form-message';
                messageContainer.textContent = '';
            }, 300);
        }
    }
    
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) {
            setTimeout(initContactForm, 200);
            return;
        }
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Ocultar mensajes anteriores
            hideMessage();
            
            // Mostrar estado de envío
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            
            try {
                // Enviar formulario a FormSubmit
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Éxito: mostrar mensaje de éxito
                    showMessage('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo a la brevedad.', 'success');
                    
                    // Limpiar formulario
                    contactForm.reset();
                    
                    // Restaurar botón después de un tiempo
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                    }, 2000);
                } else {
                    // Error: mostrar mensaje de error
                    throw new Error('Error al enviar el formulario');
                }
            } catch (error) {
                // Error: mostrar mensaje de error con opción de WhatsApp
                showMessage('Estamos teniendo problemas técnicos en este momento. Por favor, utiliza los botones de WhatsApp para comunicarte con nosotros.', 'error');
                
                // Restaurar botón
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContactForm);
    } else {
        initContactForm();
    }
})();

