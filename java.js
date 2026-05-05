function initApp() {
            document.getElementById('start-screen').style.transform = 'translateY(-100%)';
            document.getElementById('main-app').style.display = 'flex';
            setTimeout(() => document.getElementById('main-app').style.opacity = '1', 300);
        }

        function toggleSidebar() { document.getElementById('sidebar').classList.toggle('active'); }

        function clearDisplay() {
            document.getElementById('chat-box').innerHTML = '<div class="message bot-message">Welcome back! Écran effacé.</div>';
        }

        async function sendMessage() {
            const input = document.getElementById('user-input');
            const message = input.value.trim();
            if (!message) return;

            appendMessage(message, 'user-message');
            addToHistory(message);
            input.value = '';

            const chatBox = document.getElementById('chat-box');
            const loadingDiv = appendMessage("Réflexion en cours...", 'bot-message');
            chatBox.scrollTop = chatBox.scrollHeight;

            try {
                const response = await fetch('http://127.0.0.1:5000/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: message })
                });
                const data = await response.json();
                loadingDiv.innerText = data.reply || data.error;
            } catch (error) {
                loadingDiv.innerText = "Erreur: Vérifiez que le serveur Flask est lancé.";
            }
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        function appendMessage(text, className) {
            const box = document.getElementById('chat-box');
            const div = document.createElement('div');
            div.className = `message ${className}`;
            div.innerText = text;
            box.appendChild(div);
            return div;
        }

        function addToHistory(text) {
            const container = document.getElementById('history-container');
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `<span>${text.substring(0, 20)}...</span><i class="fas fa-trash-alt" style="color:#ef4444" onclick="this.parentElement.remove()"></i>`;
            container.prepend(item);
        }