/**
 * Internationalization (i18n) module for Baby Monitor
 * Supports pt-BR (default for Portuguese browsers) and en-US
 */

const STORAGE_KEY = 'babymonitor-lang';

export const translations = {
    'pt-BR': {
        // Common & Brand
        'app.title': 'Babá Eletrônica',
        'app.subtitle': 'Transmissão de áudio e vídeo em tempo real',
        'app.tagline': 'Monitore seu bebê em tempo real com qualquer celular',
        'lang.pt': 'Português',
        'lang.en': 'English',
        'lang.switch_title': 'Alterar idioma',

        // Navigation
        'nav.home': 'Início',
        'nav.features': 'Recursos',
        'nav.how_it_works': 'Como Funciona',
        'nav.github': 'GitHub',
        'nav.get_started': 'Começar Agora',

        // Hero Landing
        'hero.badge': '100% Gratuito & Open Source',
        'hero.title': 'Transforme celulares antigos em uma babá eletrônica inteligente',
        'hero.desc': 'Transmissão direta de vídeo e áudio em alta definição com baixíssima latência entre dispositivos. Sem criar conta, sem intermediários e com total privacidade.',
        'hero.cta_start': 'Usar Agora',
        'hero.cta_how': 'Como Funciona',
        'hero.stat_latency': '< 200ms',
        'hero.stat_latency_label': 'Baixa Latência',
        'hero.stat_privacy': '100%',
        'hero.stat_privacy_label': 'Privado (P2P)',
        'hero.stat_price': 'R$ 0',
        'hero.stat_price_label': 'Gratuito Sempre',
        'hero.sender_phone': 'Celular do Bebê',
        'hero.receiver_phone': 'Monitor dos Pais',
        'hero.streaming_live': 'Ao vivo',

        // Features
        'features.section_label': 'Recursos',
        'features.section_title': 'Tudo o que você precisa para a segurança do bebê',
        'features.section_desc': 'Desenvolvido por pais e para pais, com foco em estabilidade, privacidade e simplicidade.',
        'features.webrtc_title': 'Transmissão em Tempo Real',
        'features.webrtc_desc': 'Vídeo e áudio diretos de ponta a ponta com baixíssima latência via WebRTC.',
        'features.ptt_title': 'Segure para Falar (PTT)',
        'features.ptt_desc': 'Fale com o bebê diretamente do celular dos pais para acalmá-lo de qualquer cômodo.',
        'features.alerts_title': 'Alertas Visuais e Sonoros',
        'features.alerts_desc': 'Indicadores de som alto, perda de conexão e medidor de intensidade de áudio.',
        'features.lullabies_title': 'Músicas e Canções de Ninar',
        'features.lullabies_desc': 'Toque canções de ninar ou ruído branco no quarto com temporizador programável.',
        'features.privacy_title': 'Privacidade Absoluta',
        'features.privacy_desc': 'Nenhum vídeo ou áudio é gravado ou armazenado em servidores externos.',
        'features.battery_title': 'Economia de Bateria',
        'features.battery_desc': 'Tela do bebê escurece automaticamente mantendo a câmera e o microfone ativos.',
        'features.relay_title': 'Servidor Relay Integrado',
        'features.relay_desc': 'Conecte-se mesmo em redes restritivas onde conexões P2P diretas são bloqueadas.',
        'features.multi_title': 'Múltiplos Monitores',
        'features.multi_desc': 'Pai e mãe podem acompanhar a transmissão simultaneamente em aparelhos separados.',
        'features.pwa_title': 'Instalável como Aplicativo (PWA)',
        'features.pwa_desc': 'Instale na tela inicial do seu celular Android ou iOS com experiência nativa.',

        // How it works
        'how.section_label': 'Passo a Passo',
        'how.section_title': 'Pronto para uso em 30 segundos',
        'how.section_desc': 'Sem cadastros, sem senhas complicadas e sem burocracia.',
        'how.step1_title': 'Crie uma Sessão',
        'how.step1_desc': 'Escolha um nome único para o quarto do bebê (ex: bebe-quarto).',
        'how.step2_title': 'Abra a Câmera do Bebê',
        'how.step2_desc': 'No celular que ficará no quarto, abra o modo Câmera e permita acesso.',
        'how.step3_title': 'Abra o Monitor dos Pais',
        'how.step3_desc': 'No seu celular, abra com o mesmo nome de sessão para assistir e ouvir.',
        'how.step4_title': 'Salve nos Favoritos',
        'how.step4_desc': 'Adicione aos favoritos ou instale como app para abrir com 1 toque todos os dias.',

        // Open Source Section
        'open.label': 'Código Aberto',
        'open.title': 'Livre, Gratuito e Transparente',
        'open.desc': 'Este é um projeto de código aberto sob licença MIT. Você pode rodar no seu próprio servidor com total autonomia.',
        'open.item1': 'Hospede no seu próprio servidor (Docker / Coolify)',
        'open.item2': 'Sem rastreadores ou anúncios',
        'open.item3': 'Sem limites de uso ou assinaturas',
        'open.item4': 'Código auditável no GitHub',
        'open.button': 'Ver no GitHub',

        // CTA
        'cta.title': 'Pronto para começar?',
        'cta.desc': 'Configure a babá eletrônica agora mesmo direto pelo navegador.',
        'cta.button': 'Iniciar Babá Eletrônica',

        // Start Page (/start.html)
        'start.title': 'Iniciar - Babá Eletrônica',
        'start.session_label': 'Nome da Sessão',
        'start.session_placeholder': 'ex: quarto-bebe, felix-baby, maria-quarto',
        'start.session_hint': 'Escolha um nome único e difícil de adivinhar. Qualquer pessoa com esse nome pode assistir.',
        'start.quality_label': 'Qualidade do Vídeo',
        'start.quality_sd': 'SD',
        'start.quality_hd': 'HD',
        'start.quality_hint': 'SD (480p) economiza dados em conexões lentas; HD (720p) oferece maior nitidez.',
        'start.mode_label': 'Modo de Transmissão',
        'start.mode_av': 'Vídeo + Áudio',
        'start.mode_audio': 'Somente Áudio',
        'start.mode_hint': 'Somente áudio economiza bateria e consome menos dados.',
        'start.transport_label': 'Rota de Conexão',
        'start.transport_direct': 'Direto (P2P)',
        'start.transport_relay': 'Servidor Relay',
        'start.transport_hint_direct': 'Direto é mais rápido quando a conexão ponto a ponto funciona.',
        'start.transport_hint_relay': 'Servidor Relay ajuda quando a rede bloqueia conexões diretas.',
        'start.sender_btn_title': 'Celular do Bebê',
        'start.sender_btn_sub': 'Câmera - Posicione no quarto do bebê',
        'start.receiver_btn_title': 'Monitor dos Pais',
        'start.receiver_btn_sub': 'Receptor - Assista e escute o bebê',
        'start.checking_status': 'Verificando status...',
        'start.connecting_server': 'Conectando ao servidor',
        'start.sender_active': 'Câmera do bebê ativa',
        'start.receivers_count': '{count} monitor(es) conectado(s)',
        'start.session_idle': 'Sessão disponível',
        'start.instructions_title': 'Início Rápido',
        'start.instructions_step1': 'Digite o nome da sessão (o mesmo em ambos os aparelhos).',
        'start.instructions_step2': 'No celular do quarto, abra a <strong>Câmera do Bebê</strong>.',
        'start.instructions_step3': 'No seu celular, abra o <strong>Monitor dos Pais</strong> para assistir.',
        'start.instructions_step4': 'Salve a página nos favoritos para acesso rápido nos próximos dias.',

        // Sender Page (/sender.html & /s/:session)
        'sender.title': 'Babá Eletrônica - Câmera do Bebê',
        'sender.prompt_title': 'Digite o Nome da Sessão',
        'sender.prompt_desc': 'Use um nome único para conectar a câmera ao monitor dos pais',
        'sender.join_btn': 'Entrar na Sessão',
        'sender.prompt_hint': 'Salve o link nos favoritos após entrar para acesso direto diário',
        'sender.tap_to_wake': 'Toque para ativar a tela',
        'sender.dimming_soon': 'A tela vai escurecer em breve...',
        'sender.header_title': 'Câmera do Bebê',
        'sender.disconnected': 'Desconectado',
        'sender.disconnected_bang': 'Desconectado!',
        'sender.connected': 'Conectado',
        'sender.reconnecting': 'Reconectando...',
        'sender.streaming_label': 'Transmitindo:',
        'sender.streaming_av': 'Vídeo + Áudio',
        'sender.streaming_video_only': 'Somente vídeo',
        'sender.streaming_audio_only': 'Somente áudio',
        'sender.streaming_nothing': 'Nenhum',
        'sender.opt_video': 'Vídeo',
        'sender.opt_audio': 'Áudio',
        'sender.start_btn': 'Iniciar Transmissão',
        'sender.stop_btn': 'Parar Transmissão',
        'sender.info_ready': 'Clique em "Iniciar Transmissão" para começar',
        'sender.info_streaming_waiting': 'Transmitindo... Aguardando monitor dos pais conectar.',
        'sender.info_connected': 'Conectado ao monitor dos pais!',
        'sender.info_receiver_disconnected': 'Monitor dos pais desconectou. Aguardando...',
        'sender.info_no_receivers': 'Nenhum monitor conectado. Aguardando...',
        'sender.info_stopped': 'Transmissão finalizada.',
        'sender.info_video_unavailable': 'Vídeo indisponível - transmitindo apenas áudio',
        'sender.info_takeover': 'Outro aparelho assumiu como câmera. Reconectando em 2 segundos...',
        'sender.info_takeover_refresh': 'Outro aparelho conectou como câmera. Recarregue para assumir.',
        'sender.info_reclaimed': 'Câmera reassumida. Continuando transmissão...',
        'sender.info_reconnecting_server': 'Conexão com servidor perdida. Reconectando...',
        'sender.parent_speaking': '👂 Os pais estão falando...',
        'sender.parent_attention': '📱 Os pais querem atenção',
        'sender.playing_music': 'Tocando canção...',
        'sender.shutting_down_in': 'Desligamento em {time}',
        'sender.play_lullabies': 'Tocar canções de ninar',
        'sender.reset': 'Reiniciar',
        'sender.error_permission': 'Falha ao acessar câmera/microfone: {error}',

        // Receiver Page (/receiver.html & /r/:session)
        'receiver.title': 'Babá Eletrônica - Monitor dos Pais',
        'receiver.prompt_title': 'Digite o Nome da Sessão',
        'receiver.prompt_desc': 'Use o mesmo nome configurado na câmera do bebê',
        'receiver.header_title': 'Monitor dos Pais',
        'receiver.connecting': 'Conectando...',
        'receiver.waiting': 'Aguardando',
        'receiver.connection_lost': 'CONEXÃO PERDIDA',
        'receiver.loud_sound_detected': 'SOM ALTO DETECTADO',
        'receiver.waiting_sender': 'Aguardando a câmera do bebê iniciar transmissão...',
        'receiver.waiting_media': 'A tela do bebê apagou? Aguardando sinal de mídia...',
        'receiver.media_paused': 'Mídia pausada',
        'receiver.tap_to_enable_audio': 'Toque na tela para ativar o áudio',
        'receiver.audio_only': 'Somente Áudio',
        'receiver.audio_only_subtext': 'Vídeo desativado na câmera do bebê',
        'receiver.baby': 'Bebê',
        'receiver.ptt_speaking': 'Falando com o bebê...',
        'receiver.ptt_alerting': 'Alertando o bebê...',
        'receiver.ptt_hold_to_talk': 'Segure para falar',
        'receiver.ptt_hold_to_alert': 'Segure para alertar',
        'receiver.ptt_denied': 'Microfone não autorizado',
        'receiver.controls': 'Controles',
        'receiver.lock': 'Bloquear',
        'receiver.unlock_holding': 'Mantenha pressionado...',
        'receiver.hold_to_unlock': 'Segure para desbloquear',
        'receiver.volume': 'Volume',
        'receiver.alert_sensitivity': 'Sensibilidade do Alerta',
        'receiver.noise_gate': 'Filtro de Ruído (Noise Gate)',
        'receiver.noise_gate_hint_off': 'Silencia sons abaixo do nível limite',
        'receiver.noise_gate_hint_on': 'Sons abaixo de {val}% serão silenciados',
        'receiver.music': 'Músicas',
        'receiver.audio_only_mode': 'Modo somente áudio',
        'receiver.reduce_music_echo': 'Reduzir eco de música',
        'receiver.play_sensitivity_alert': 'Tocar alerta sonoro quando detectar som alto',
        'receiver.loop_monitor_tone': 'Tocar tom suave de monitoramento contínuo',
        'receiver.monitor_tone_volume': 'Volume do tom de monitoramento',
        'receiver.auto_shutdown': 'Desligamento automático da câmera',
        'receiver.auto_shutdown_hint': 'Escolha o tempo e clique em Definir',
        'receiver.set': 'Definir',
        'receiver.disabled': 'Desativado',
        'receiver.shutdown_now': 'Desligar agora',
        'receiver.test_sound': 'Som de Teste',
        'receiver.send_test_ping': 'Enviar bipe de teste',
        'receiver.test_sound_hint': 'Injeta um bipe curto no áudio para verificar o volume',
        'receiver.reload': 'Recarregar',
        'receiver.timer_45m': '45 min',
        'receiver.timer_1h': '1 hora',
        'receiver.timer_1h45': '1h 45min',
        'receiver.timer_2h': '2 horas',
        'receiver.timer_4h': '4 horas',
        'receiver.timer_6h': '6 horas',
        'receiver.timer_8h': '8 horas',
        'receiver.timer_10h': '10 horas',
        'receiver.timer_20m': '20 min',
        'receiver.timer_10s': '10 seg',
        'receiver.timer_30s': '30 seg',
        'receiver.timer_5m': '5 min',
        'receiver.time_hours': 'horas',
        'receiver.time_minutes': 'minutos',
        'receiver.time_seconds': 'segundos',
        'receiver.test_sound_received': 'Câmera recebeu',
        'receiver.test_sound_playing': 'Tocando bipe',
        'receiver.test_sound_sent': 'Bipe enviado',
        'receiver.test_sound_failed': 'Falha no teste',
        'receiver.test_sound_busy': 'Câmera ocupada',
        'receiver.debug': 'Depuração',
        'receiver.minimize': 'Minimizar',
        'receiver.open': 'Abrir'
    },
    'en-US': {
        // Common & Brand
        'app.title': 'Baby Monitor',
        'app.subtitle': 'Real-time audio & video streaming',
        'app.tagline': 'Monitor your baby in real time with any phone',
        'lang.pt': 'Português',
        'lang.en': 'English',
        'lang.switch_title': 'Change language',

        // Navigation
        'nav.home': 'Home',
        'nav.features': 'Features',
        'nav.how_it_works': 'How It Works',
        'nav.github': 'GitHub',
        'nav.get_started': 'Get Started',

        // Hero Landing
        'hero.badge': '100% Free & Open Source',
        'hero.title': 'Turn any phone into a smart baby monitor',
        'hero.desc': 'Direct real-time HD video & audio streaming between two devices. No accounts, no subscriptions, and complete privacy.',
        'hero.cta_start': 'Launch Now',
        'hero.cta_how': 'How It Works',
        'hero.stat_latency': '< 200ms',
        'hero.stat_latency_label': 'Low Latency',
        'hero.stat_privacy': '100%',
        'hero.stat_privacy_label': 'Private (P2P)',
        'hero.stat_price': '$0',
        'hero.stat_price_label': 'Free Forever',
        'hero.sender_phone': "Baby's Phone",
        'hero.receiver_phone': "Parent's Phone",
        'hero.streaming_live': 'Live',

        // Features
        'features.section_label': 'Features',
        'features.section_title': 'Everything you need for peace of mind',
        'features.section_desc': 'Built by parents for parents, focusing on reliability, privacy, and simplicity.',
        'features.webrtc_title': 'Real-Time Streaming',
        'features.webrtc_desc': 'Low-latency direct peer-to-peer audio and video via WebRTC.',
        'features.ptt_title': 'Push-to-Talk (PTT)',
        'features.ptt_desc': 'Talk back to soothe your baby directly from the parent phone.',
        'features.alerts_title': 'Visual & Audio Alerts',
        'features.alerts_desc': 'Loud sound indicators, disconnection warnings, and volume level meter.',
        'features.lullabies_title': 'Lullaby Playback',
        'features.lullabies_desc': 'Play soothing lullabies or white noise on the baby phone with auto timer.',
        'features.privacy_title': 'Absolute Privacy',
        'features.privacy_desc': 'Media is never recorded or stored on any external servers.',
        'features.battery_title': 'Battery Optimized',
        'features.battery_desc': 'Baby phone screen automatically dims while keeping camera & mic active.',
        'features.relay_title': 'Built-In Server Relay',
        'features.relay_desc': 'Seamless fallback bridge when direct peer-to-peer is blocked by routers.',
        'features.multi_title': 'Multiple Receivers',
        'features.multi_desc': 'Both parents can watch and listen at the same time on separate devices.',
        'features.pwa_title': 'Progressive Web App (PWA)',
        'features.pwa_desc': 'Install on Android or iOS home screen for an app-like experience.',

        // How it works
        'how.section_label': 'Quick Setup',
        'how.section_title': 'Up and Running in 30 Seconds',
        'how.section_desc': 'No accounts, no setup wizards, and no pairing headaches.',
        'how.step1_title': 'Create a Session',
        'how.step1_desc': 'Choose any unique room name (e.g., nursery, baby-cam).',
        'how.step2_title': "Set Up Baby's Phone",
        'how.step2_desc': 'Open the sender page on the phone near baby and allow camera/mic.',
        'how.step3_title': 'Watch & Listen',
        'how.step3_desc': 'Open receiver on your phone with the same session name.',
        'how.step4_title': 'Bookmark & Install',
        'how.step4_desc': 'Bookmark or install as PWA for 1-tap access every night.',

        // Open Source Section
        'open.label': 'Open Source',
        'open.title': 'Free Forever. No Catch.',
        'open.desc': 'A genuine open-source project under the MIT license. Run on your own server with total control.',
        'open.item1': 'Self-host with Docker / Coolify',
        'open.item2': 'No tracking or advertising',
        'open.item3': 'No accounts or subscriptions',
        'open.item4': 'Auditable source code on GitHub',
        'open.button': 'View on GitHub',

        // CTA
        'cta.title': 'Ready to Get Started?',
        'cta.desc': 'Set up your baby monitor in under a minute directly in your browser.',
        'cta.button': 'Launch Baby Monitor',

        // Start Page (/start.html)
        'start.title': 'Start - Baby Monitor',
        'start.session_label': 'Session Name',
        'start.session_placeholder': 'e.g., nursery, baby-cam, felix-baby',
        'start.session_hint': 'Pick something unique — this name is your password. Anyone who knows it can watch.',
        'start.quality_label': 'Video Quality',
        'start.quality_sd': 'SD',
        'start.quality_hd': 'HD',
        'start.quality_hint': 'SD (480p) uses less data on slow connections; HD (720p) is clearer.',
        'start.mode_label': 'Stream Mode',
        'start.mode_av': 'Audio + Video',
        'start.mode_audio': 'Audio Only',
        'start.mode_hint': 'Audio-only saves data and battery life.',
        'start.transport_label': 'Connection Route',
        'start.transport_direct': 'Direct (P2P)',
        'start.transport_relay': 'Server Relay',
        'start.transport_hint_direct': 'Direct is fastest when peer-to-peer works.',
        'start.transport_hint_relay': 'Server Relay helps when routers block direct connections.',
        'start.sender_btn_title': "Baby's Phone",
        'start.sender_btn_sub': 'Sender - Place near baby',
        'start.receiver_btn_title': "Parent's Phone",
        'start.receiver_btn_sub': 'Receiver - Watch & listen',
        'start.checking_status': 'Checking status...',
        'start.connecting_server': 'Connecting to server',
        'start.sender_active': "Baby's camera is active",
        'start.receivers_count': '{count} receiver(s) connected',
        'start.session_idle': 'Session available',
        'start.instructions_title': 'Quick Start',
        'start.instructions_step1': 'Enter a session name (use the same name on both devices).',
        'start.instructions_step2': "Open <strong>Sender</strong> on the phone near your baby.",
        'start.instructions_step3': "Open <strong>Receiver</strong> on your phone to watch.",
        'start.instructions_step4': 'Bookmark the URL for instant access tomorrow.',

        // Sender Page (/sender.html & /s/:session)
        'sender.title': "Baby Monitor - Baby's Phone",
        'sender.prompt_title': 'Enter Session Name',
        'sender.prompt_desc': 'Use a unique name to connect sender and receiver',
        'sender.join_btn': 'Join Session',
        'sender.prompt_hint': 'Bookmark the URL after joining for easy daily access',
        'sender.tap_to_wake': 'Tap to wake',
        'sender.dimming_soon': 'Screen dimming soon...',
        'sender.header_title': "Baby's Phone",
        'sender.disconnected': 'Disconnected',
        'sender.disconnected_bang': 'Disconnected!',
        'sender.connected': 'Connected',
        'sender.reconnecting': 'Reconnecting...',
        'sender.streaming_label': 'Sending:',
        'sender.streaming_av': 'Video + Audio',
        'sender.streaming_video_only': 'Video only',
        'sender.streaming_audio_only': 'Audio only',
        'sender.streaming_nothing': 'Nothing',
        'sender.opt_video': 'Video',
        'sender.opt_audio': 'Audio',
        'sender.start_btn': 'Start Streaming',
        'sender.stop_btn': 'Stop Streaming',
        'sender.info_ready': 'Click "Start Streaming" to begin broadcasting',
        'sender.info_streaming_waiting': 'Streaming... Waiting for receivers.',
        'sender.info_connected': 'Connected to receiver!',
        'sender.info_receiver_disconnected': 'Receiver disconnected. Waiting...',
        'sender.info_no_receivers': 'No receivers connected. Waiting...',
        'sender.info_stopped': 'Streaming stopped.',
        'sender.info_video_unavailable': 'Video unavailable - streaming audio only',
        'sender.info_takeover': 'Another device took over. Reclaiming in 2 seconds...',
        'sender.info_takeover_refresh': 'Another device took over as sender. Refresh to reclaim.',
        'sender.info_reclaimed': 'Reclaimed sender role. Continuing stream...',
        'sender.info_reconnecting_server': 'Lost server connection. Reconnecting...',
        'sender.parent_speaking': '👂 Parent is speaking...',
        'sender.parent_attention': '📱 Parent wants attention',
        'sender.playing_music': 'Playing...',
        'sender.shutting_down_in': 'Shutting down in {time}',
        'sender.play_lullabies': 'Play lullabies',
        'sender.reset': 'Reset',
        'sender.error_permission': 'Failed to access camera/microphone: {error}',

        // Receiver Page (/receiver.html & /r/:session)
        'receiver.title': "Baby Monitor - Parent's Phone",
        'receiver.prompt_title': 'Enter Session Name',
        'receiver.prompt_desc': 'Use the same name as the sender to connect',
        'receiver.header_title': "Parent's Phone",
        'receiver.connecting': 'Connecting...',
        'receiver.waiting': 'Waiting',
        'receiver.connection_lost': 'CONNECTION LOST',
        'receiver.loud_sound_detected': 'LOUD SOUND DETECTED',
        'receiver.waiting_sender': 'Waiting for sender to start streaming...',
        'receiver.waiting_media': 'Sender screen off? Waiting for media...',
        'receiver.media_paused': 'Media paused',
        'receiver.tap_to_enable_audio': 'Tap anywhere to enable audio',
        'receiver.audio_only': 'Audio Only',
        'receiver.audio_only_subtext': 'Video disabled on sender',
        'receiver.baby': 'Baby',
        'receiver.ptt_speaking': 'Speaking...',
        'receiver.ptt_alerting': 'Alerting sender...',
        'receiver.ptt_hold_to_talk': 'Hold to talk to baby',
        'receiver.ptt_hold_to_alert': 'Hold to alert sender',
        'receiver.ptt_denied': 'Mic access denied',
        'receiver.controls': 'Controls',
        'receiver.lock': 'Lock',
        'receiver.unlock_holding': 'Keep holding...',
        'receiver.hold_to_unlock': 'Hold to unlock',
        'receiver.volume': 'Volume',
        'receiver.alert_sensitivity': 'Alert Sensitivity',
        'receiver.noise_gate': 'Noise Gate',
        'receiver.noise_gate_hint_off': 'Mutes audio below threshold level',
        'receiver.noise_gate_hint_on': 'Audio below {val}% will be muted',
        'receiver.music': 'Music',
        'receiver.audio_only_mode': 'Audio only mode',
        'receiver.reduce_music_echo': 'Reduce music echo',
        'receiver.play_sensitivity_alert': 'Play sensitivity alert sound',
        'receiver.loop_monitor_tone': 'Loop monitor tone while connected',
        'receiver.monitor_tone_volume': 'Monitor Tone Volume',
        'receiver.auto_shutdown': 'Auto-shutdown',
        'receiver.auto_shutdown_hint': 'Choose a time, then tap Set or Reset',
        'receiver.set': 'Set',
        'receiver.disabled': 'Disabled',
        'receiver.shutdown_now': 'Shutdown now',
        'receiver.test_sound': 'Test Sound',
        'receiver.send_test_ping': 'Send test ping',
        'receiver.test_sound_hint': 'Injects a short ping into the baby audio stream',
        'receiver.reload': 'Reload',
        'receiver.timer_45m': '45 min',
        'receiver.timer_1h': '1 hour',
        'receiver.timer_1h45': '1:45',
        'receiver.timer_2h': '2 hours',
        'receiver.timer_4h': '4 hours',
        'receiver.timer_6h': '6 hours',
        'receiver.timer_8h': '8 hours',
        'receiver.timer_10h': '10 hours',
        'receiver.timer_20m': '20 min',
        'receiver.timer_10s': '10 sec',
        'receiver.timer_30s': '30 sec',
        'receiver.timer_5m': '5 min',
        'receiver.time_hours': 'hours',
        'receiver.time_minutes': 'minutes',
        'receiver.time_seconds': 'seconds',
        'receiver.test_sound_received': 'Sender received',
        'receiver.test_sound_playing': 'Playing ping',
        'receiver.test_sound_sent': 'Ping sent',
        'receiver.test_sound_failed': 'Ping failed',
        'receiver.test_sound_busy': 'Sender busy',
        'receiver.debug': 'Debug',
        'receiver.minimize': 'Minimize',
        'receiver.open': 'Open'
    }
};

let currentLang = 'pt-BR';
const listeners = new Set();

export function getPreferredLanguage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (saved === 'pt-BR' || saved === 'en-US' || saved === 'pt' || saved === 'en')) {
        return saved.startsWith('pt') ? 'pt-BR' : 'en-US';
    }

    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (browserLang.startsWith('pt')) {
        return 'pt-BR';
    }
    return 'en-US';
}

export function initI18n() {
    currentLang = getPreferredLanguage();
    applyTranslations();
    setupLanguageSwitchers();
    return currentLang;
}

export function getLanguage() {
    return currentLang;
}

export function setLanguage(lang) {
    const normalized = lang.startsWith('pt') ? 'pt-BR' : 'en-US';
    currentLang = normalized;
    localStorage.setItem(STORAGE_KEY, normalized);
    document.documentElement.lang = normalized.startsWith('pt') ? 'pt-BR' : 'en';
    applyTranslations();
    updateSwitcherUI();
    listeners.forEach(fn => {
        try { fn(normalized); } catch (e) { console.error('i18n listener error:', e); }
    });
}

export function onLanguageChange(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
}

export function t(key, params = {}) {
    const langDict = translations[currentLang] || translations['pt-BR'];
    let text = langDict[key] || translations['en-US'][key] || key;

    for (const [k, v] of Object.entries(params)) {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    }
    return text;
}

export function applyTranslations(root = document) {
    document.documentElement.lang = currentLang.startsWith('pt') ? 'pt-BR' : 'en';

    root.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = t(key);
        if (text !== key) {
            el.innerHTML = text;
        }
    });

    root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.setAttribute('placeholder', t(key));
    });

    root.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        el.setAttribute('title', t(key));
    });

    root.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria-label');
        el.setAttribute('aria-label', t(key));
    });

    // Update document title if marked
    const titleEl = root.querySelector('title[data-i18n]');
    if (titleEl) {
        document.title = t(titleEl.getAttribute('data-i18n'));
    }
}

export function createLanguageSwitcher(containerId = 'langSwitcher') {
    let container = document.getElementById(containerId);
    if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        container.className = 'lang-switcher';
    }

    container.innerHTML = `
        <button type="button" class="lang-btn ${currentLang === 'pt-BR' ? 'active' : ''}" data-lang="pt-BR" title="Português (Brasil)">
            <span class="lang-flag">🇧🇷</span>
            <span class="lang-text">PT</span>
        </button>
        <button type="button" class="lang-btn ${currentLang === 'en-US' ? 'active' : ''}" data-lang="en-US" title="English">
            <span class="lang-flag">🇺🇸</span>
            <span class="lang-text">EN</span>
        </button>
    `;

    container.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetLang = btn.getAttribute('data-lang');
            setLanguage(targetLang);
        });
    });

    return container;
}

function updateSwitcherUI() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const lang = btn.getAttribute('data-lang');
        btn.classList.toggle('active', (lang === 'pt-BR' && currentLang === 'pt-BR') || (lang === 'en-US' && currentLang === 'en-US'));
    });
}

function setupLanguageSwitchers() {
    document.querySelectorAll('.lang-switcher-auto').forEach(container => {
        createLanguageSwitcher(container.id);
    });
    updateSwitcherUI();
}

// Auto-run if loaded as standard script or module in browser
if (typeof window !== 'undefined') {
    window.i18n = { t, getLanguage, setLanguage, applyTranslations, onLanguageChange, initI18n };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => initI18n());
    } else {
        initI18n();
    }
}
