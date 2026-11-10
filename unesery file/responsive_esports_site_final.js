    // --- Application State ---
    const appState = {
      currentUser: {
        gamertag: "Fita",
        email: "fita.ethiopia@esports-nexus.et",
        avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&auto=format&fit=crop&q=80",
        points: 2850,
        level: 24,
        balance: 14250,
        pendingBalance: 1500,
        totalWithdrawn: 32000,
        rank: 7,
        bio: "Ethiopian competitive gamer from Addis Ababa. EA FC 24 and PUBG Mobile specialist targeting the Top 3 ETB prize spot!",
        handles: {
          telebirr: "+251 91 198 7654",
          cbe: "100029384810",
          dashen: "+251 91 198 7654",
          awash: "+251 91 198 7654",
          ea: "Fita_ETH_99",
          pubg: "5182930419"
        },
        playingGames: [
          { name: "EA FC 24", category: "Console / PC Football", icon: "fa-football" },
          { name: "PUBG Mobile", category: "Battle Royale", icon: "fa-person-rifle" },
          { name: "eFootball 2024", category: "Mobile Sports", icon: "fa-mobile-screen" },
          { name: "Call of Duty Mobile", category: "Action FPS", icon: "fa-gun" }
        ],
        transactions: [
          { txId: "TX-94812", gateway: "CBE Birr", amount: "1,500 ETB", date: "Today, 02:15 PM", status: "Pending" },
          { txId: "TX-83921", gateway: "Telebirr", amount: "5,000 ETB", date: "24 Oct 2026", status: "Completed" },
          { txId: "TX-71029", gateway: "Awash Bank / AwashBirr", amount: "12,000 ETB", date: "15 Oct 2026", status: "Completed" },
          { txId: "TX-58192", gateway: "Dashen Bank / Amole", amount: "15,000 ETB", date: "01 Oct 2026", status: "Completed" }
        ]
      },
      currentTab: "home",
      authMode: "login",
      theme: "dark",
      selectedGame: "EA FC 24",
      selectedGateway: "Telebirr (Ethio Telecom Mobile Money)",
      playerSort: "points-desc",
      profileUser: null
    };

    const conversations = [
      {
        id: "c1",
        name: "Abebe_Pro",
        role: "EA FC 24 Champion (#1)",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        online: true,
        statusText: "online • EA FC Specialist",
        unread: 1,
        messages: [
          { sender: "them", text: "Yo Fita! Your squad is looking sharp on the leaderboard.", time: "10:14 AM" },
          { sender: "them", text: "Want to queue for the weekend league tournament tonight?", time: "10:15 AM" }
        ]
      },
      {
        id: "c2",
        name: "Selam_Sniper",
        role: "PUBG Mobile Lead (#2)",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        online: true,
        statusText: "online • PUBG Sniper",
        unread: 1,
        messages: [
          { sender: "them", text: "Hey! Did you register for the Hawassa PUBG Cup?", time: "Yesterday" }
        ]
      },
      {
        id: "c3",
        name: "Hawassa Gamers Club 🇪🇹",
        role: "Official Group • 142 Members",
        avatar: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&auto=format&fit=crop&q=80",
        online: false,
        statusText: "142 members, 18 online",
        unread: 0,
        messages: [
          { sender: "them", text: "Tariku_FC: Match created! Room Code: 88291", time: "08:42 AM" }
        ]
      }
    ];

    let activeChatId = "c1";

    function getProfileUser() {
      return appState.profileUser || appState.currentUser;
    }

    function createProfileUserFromPlayer(player) {
      const games = (player.games || 'EA FC 24, PUBG Mobile').split(',').map(g => g.trim()).filter(Boolean);
      const normalized = games.length ? games : ['EA FC 24'];

      return {
        gamertag: player.gamertag,
        email: `${player.gamertag.toLowerCase()}@esports-nexus.et`,
        avatar: player.avatar,
        points: player.points || 2400,
        level: Math.max(18, Math.min(99, Math.floor((player.points || 2400) / 120) + 18)),
        balance: Math.max(1500, Math.round((player.points || 2400) * 4.5)),
        pendingBalance: 0,
        totalWithdrawn: Math.max(0, Math.round((player.points || 2400) * 2.2)),
        rank: player.rank || 1,
        bio: `${player.gamertag} is a competitive Ethiopian gamer focused on high-pressure matches and regional tournament battles.`,
        handles: {
          telebirr: "+251 9" + Math.floor(10000000 + Math.random() * 90000000).toString().slice(0, 8),
          cbe: String(Math.floor(1000000000 + Math.random() * 9000000000)),
          ea: `${player.gamertag}_ID`,
          pubg: String(Math.floor(100000000 + Math.random() * 900000000))
        },
        playingGames: normalized.map((name, index) => ({
          name,
          category: index % 2 === 0 ? 'Competitive Multiplayer' : 'Esports Arena',
          icon: index % 2 === 0 ? 'fa-gamepad' : 'fa-trophy'
        })),
        transactions: [
          { txId: 'TX-OPEN', gateway: 'Telebirr', amount: '0 ETB', date: 'Recently', status: 'No record' }
        ]
      };
    }

    function openPlayerProfile(player) {
      appState.profileUser = createProfileUserFromPlayer(player);
      navigateTo('profile');
    }

    function backToMyProfile() {
      appState.profileUser = null;
      navigateTo('profile');
    }

    // --- Ethiopian Esports Data Collections ---
    const leaderboardData = [
      { rank: 1, gamertag: "Abebe_Pro", points: 4200, prize: "80,000 ETB", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", status: "Qualified #1" },
      { rank: 2, gamertag: "Selam_Sniper", points: 3850, prize: "45,000 ETB", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", status: "Qualified #2" },
      { rank: 3, gamertag: "Tariku_FC", points: 3410, prize: "25,000 ETB", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80", status: "Qualified #3" },
      { rank: 4, gamertag: "Dawi_Gamer", points: 3200, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
      { rank: 5, gamertag: "Helen_MLBB", points: 3050, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
      { rank: 6, gamertag: "Kaleb_X", points: 2910, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
      { rank: 7, gamertag: "Fita", points: 2850, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10", isCurrent: true },
      { rank: 8, gamertag: "Yared_PUBG", points: 2640, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
      { rank: 9, gamertag: "Beti_Play", points: 2500, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
      { rank: 10, gamertag: "Ermias_G", points: 2420, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" }
    ];

    const leaderboardByGame = {
      "EA FC 24": [
        { rank: 1, gamertag: "Abebe_Pro", points: 4200, prize: "80,000 ETB", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", status: "Qualified #1" },
        { rank: 2, gamertag: "Selam_Sniper", points: 3850, prize: "45,000 ETB", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", status: "Qualified #2" },
        { rank: 3, gamertag: "Tariku_FC", points: 3410, prize: "25,000 ETB", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80", status: "Qualified #3" },
        { rank: 4, gamertag: "Fita", points: 3200, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10", isCurrent: true },
        { rank: 5, gamertag: "Dawi_Gamer", points: 3050, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 6, gamertag: "Helen_MLBB", points: 2910, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 7, gamertag: "Kaleb_X", points: 2850, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 8, gamertag: "Yared_PUBG", points: 2640, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 9, gamertag: "Beti_Play", points: 2500, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 10, gamertag: "Ermias_G", points: 2420, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" }
      ],
      "PUBG Mobile": [
        { rank: 1, gamertag: "Selam_Sniper", points: 4700, prize: "90,000 ETB", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", status: "Qualified #1" },
        { rank: 2, gamertag: "Dawi_Gamer", points: 4350, prize: "55,000 ETB", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80", status: "Qualified #2" },
        { rank: 3, gamertag: "Yared_PUBG", points: 4010, prize: "30,000 ETB", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", status: "Qualified #3" },
        { rank: 4, gamertag: "Ermias_G", points: 3880, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 5, gamertag: "Abebe_Pro", points: 3710, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 6, gamertag: "Helen_MLBB", points: 3560, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 7, gamertag: "Fita", points: 3440, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10", isCurrent: true },
        { rank: 8, gamertag: "Tariku_FC", points: 3320, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 9, gamertag: "Kaleb_X", points: 3170, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 10, gamertag: "Beti_Play", points: 2990, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" }
      ],
      "eFootball 2024": [
        { rank: 1, gamertag: "Tariku_FC", points: 4500, prize: "85,000 ETB", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80", status: "Qualified #1" },
        { rank: 2, gamertag: "Abebe_Pro", points: 4180, prize: "50,000 ETB", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", status: "Qualified #2" },
        { rank: 3, gamertag: "Fita", points: 3930, prize: "28,000 ETB", avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80", status: "Qualified #3", isCurrent: true },
        { rank: 4, gamertag: "Selam_Sniper", points: 3740, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 5, gamertag: "Dawi_Gamer", points: 3590, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 6, gamertag: "Kaleb_X", points: 3410, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 7, gamertag: "Beti_Play", points: 3220, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 8, gamertag: "Yared_PUBG", points: 3010, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 9, gamertag: "Ermias_G", points: 2840, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 10, gamertag: "Helen_MLBB", points: 2700, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" }
      ],
      "Call of Duty Mobile": [
        { rank: 1, gamertag: "Helen_MLBB", points: 4650, prize: "88,000 ETB", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80", status: "Qualified #1" },
        { rank: 2, gamertag: "Abebe_Pro", points: 4330, prize: "52,000 ETB", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", status: "Qualified #2" },
        { rank: 3, gamertag: "Selam_Sniper", points: 3990, prize: "29,000 ETB", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", status: "Qualified #3" },
        { rank: 4, gamertag: "Yared_PUBG", points: 3820, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 5, gamertag: "Ermias_G", points: 3650, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 6, gamertag: "Dawi_Gamer", points: 3490, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 7, gamertag: "Fita", points: 3370, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10", isCurrent: true },
        { rank: 8, gamertag: "Tariku_FC", points: 3210, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 9, gamertag: "Beti_Play", points: 3090, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" },
        { rank: 10, gamertag: "Kaleb_X", points: 2940, prize: "Finalist Spot", avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80", status: "Qualified Top 10" }
      ]
    };

    const tournamentsData = [
      { title: "Addis EA FC 24 Championship", game: "EA FC 24", genre: "Sports", entry: "Free / Telebirr Verified", prizePool: "50,000 ETB", pointsReward: "+500 PTS", status: "Registration Open", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=80" },
      { title: "Ethiopian PUBG Mobile Showdown", game: "PUBG Mobile", genre: "Battle Royale", entry: "100 ETB / Telebirr", prizePool: "60,000 ETB", pointsReward: "+750 PTS", status: "Live Now", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80" },
      { title: "Hawassa COD Mobile Battle", game: "COD Mobile", genre: "FPS", entry: "Free", prizePool: "25,000 ETB", pointsReward: "+350 PTS", status: "Starts Tomorrow", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&auto=format&fit=crop&q=80" },
      { title: "eFootball Mobile Regional Cup", game: "eFootball 2024", genre: "Sports", entry: "50 ETB / CBE Birr", prizePool: "15,000 ETB", pointsReward: "+300 PTS", status: "Registration Open", image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&auto=format&fit=crop&q=80" }
    ];

    const competitorsData = [
      { gamertag: "Abebe_Pro", rank: 1, points: 4200, games: "EA FC 24, FIFA 23", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80" },
      { gamertag: "Selam_Sniper", rank: 2, points: 3850, games: "PUBG Mobile, CODM", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
      { gamertag: "Tariku_FC", rank: 3, points: 3410, games: "EA FC 24, eFootball", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80" },
      { gamertag: "Dawi_Gamer", rank: 4, points: 3200, games: "PUBG Mobile", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80" },
      { gamertag: "Fita", rank: 7, points: 2850, games: "EA FC 24, PUBG Mobile, eFootball", avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80" }
    ];

    // --- Custom Dropdown Handlers ---
    function syncDropdownSelection(menuId, selectedValue) {
      const menu = document.getElementById(menuId);
      if (!menu) return;

      menu.querySelectorAll('.custom-dropdown-option').forEach(option => {
        const optionText = option.textContent.trim();
        option.classList.toggle('is-selected', optionText === selectedValue);
      });
    }

    function positionDropdownMenu(menuId, triggerId) {
      const menu = document.getElementById(menuId);
      const trigger = triggerId ? document.getElementById(triggerId) : null;
      if (!menu || !trigger) return;

      const width = Math.max(trigger.offsetWidth, menu.dataset.minWidth ? Number(menu.dataset.minWidth) : 180);
      const rect = trigger.getBoundingClientRect();
      const top = Math.min(rect.bottom + 8, window.innerHeight - (menu.offsetHeight || 220) - 12);
      const left = Math.min(Math.max(12, rect.left), window.innerWidth - width - 12);

      menu.style.position = 'fixed';
      menu.style.left = `${left}px`;
      menu.style.top = `${top}px`;
      menu.style.right = 'auto';
      menu.style.width = `${width}px`;
      menu.style.zIndex = '9999';
    }

    function toggleDropdown(menuId, arrowId, event) {
      if (event) event.stopPropagation();
      const menu = document.getElementById(menuId);
      const arrow = document.getElementById(arrowId);
      const triggerId = menuId.replace('-menu', '-btn');
      if (!menu) return;

      const isClosed = menu.classList.contains('hidden');

      // Close all active custom dropdowns first
      document.querySelectorAll('[id$="-dropdown-menu"]').forEach(m => m.classList.add('hidden'));
      document.querySelectorAll('[id$="-dropdown-arrow"]').forEach(a => a.style.transform = 'rotate(0deg)');

      if (isClosed) {
        menu.classList.remove('hidden');
        positionDropdownMenu(menuId, triggerId);
        const selectedId = menuId.replace('-menu', '-selected');
        const selectedValue = document.getElementById(selectedId)?.textContent.trim() || '';
        syncDropdownSelection(menuId, selectedValue);
        if (arrow) arrow.style.transform = 'rotate(180deg)';
      }
    }

    function selectGameOption(title) {
      appState.selectedGame = title;
      document.getElementById('game-dropdown-selected').innerText = title;
      document.getElementById('game-dropdown-menu').classList.add('hidden');
      document.getElementById('game-dropdown-arrow').style.transform = 'rotate(0deg)';
      syncDropdownSelection('game-dropdown-menu', title);
      renderLeaderboard();
    }

    function selectGatewayOption(gateway) {
      appState.selectedGateway = gateway;
      document.getElementById('gateway-dropdown-selected').innerText = gateway;
      document.getElementById('gateway-dropdown-menu').classList.add('hidden');
      document.getElementById('gateway-dropdown-arrow').style.transform = 'rotate(0deg)';
      syncDropdownSelection('gateway-dropdown-menu', gateway);
    }

    function selectSortOption(sortKey, label) {
      appState.playerSort = sortKey;
      document.getElementById('sort-dropdown-selected').innerText = label;
      document.getElementById('sort-dropdown-menu').classList.add('hidden');
      document.getElementById('sort-dropdown-arrow').style.transform = 'rotate(0deg)';
      syncDropdownSelection('sort-dropdown-menu', label);
      renderPlayers();
    }

    // Close any custom dropdown when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('[id$="-dropdown-btn"]')) {
        document.querySelectorAll('[id$="-dropdown-menu"]').forEach(m => m.classList.add('hidden'));
        document.querySelectorAll('[id$="-dropdown-arrow"]').forEach(a => a.style.transform = 'rotate(0deg)');
      }
    });

    window.addEventListener('resize', function() {
      document.querySelectorAll('[id$="-dropdown-menu"]').forEach(menu => {
        if (!menu.classList.contains('hidden')) {
          const triggerId = menu.id.replace('-menu', '-btn');
          positionDropdownMenu(menu.id, triggerId);
        }
      });
    });

    // --- Notification Menu Handlers ---
    function toggleNotifications(event) {
      if (event) event.stopPropagation();
      const dropdown = document.getElementById('notif-dropdown');
      const arrow = document.getElementById('notif-dropdown-arrow');
      if (!dropdown) return;

      const isClosed = dropdown.classList.contains('hidden');
      document.querySelectorAll('[id$="-dropdown-menu"]').forEach(m => m.classList.add('hidden'));
      document.querySelectorAll('[id$="-dropdown-arrow"]').forEach(a => a.style.transform = 'rotate(0deg)');

      if (isClosed) {
        dropdown.classList.remove('hidden');
        if (arrow) arrow.style.transform = 'rotate(180deg)';
      } else {
        dropdown.classList.add('hidden');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
      }
    }

    function markAllNotificationsRead() {
      const badge = document.getElementById('notif-badge');
      if (badge) {
        badge.classList.add('hidden');
      }
      showToast("All notifications marked as read.");
    }

    document.addEventListener('click', function(event) {
      const dropdown = document.getElementById('notif-dropdown');
      const notifBtn = event.target.closest('#notif-dropdown-btn');
      if (dropdown && !dropdown.classList.contains('hidden') && !dropdown.contains(event.target) && !notifBtn) {
        dropdown.classList.add('hidden');
        const arrow = document.getElementById('notif-dropdown-arrow');
        if (arrow) arrow.style.transform = 'rotate(0deg)';
      }
    });

    // --- Light/Dark Theme Toggle ---
    function toggleTheme() {
      const html = document.documentElement;
      const themeIcon = document.getElementById('theme-toggle-icon');

      if (appState.theme === 'dark') {
        appState.theme = 'light';
        html.classList.remove('dark');
        html.classList.add('light');
        html.style.backgroundColor = '#f8fafc';
        html.style.color = '#0f172a';
        themeIcon.className = "fa-solid fa-moon text-slate-700";
        showToast("Switched to Light Mode");
      } else {
        appState.theme = 'dark';
        html.classList.remove('light');
        html.classList.add('dark');
        html.style.backgroundColor = '#020617';
        html.style.color = '#f8fafc';
        themeIcon.className = "fa-solid fa-sun text-brand-gold";
        showToast("Switched to Dark Mode");
      }
    }

    // --- Core Navigation Handler ---
    function navigateTo(tabName) {
      appState.currentTab = tabName;

      document.querySelectorAll('.view-panel').forEach(panel => {
        panel.classList.add('hidden');
      });
      const activePanel = document.getElementById(`view-${tabName}`);
      if (activePanel) {
        activePanel.classList.remove('hidden');
      }

      document.querySelectorAll('.nav-tab-btn').forEach(btn => {
        const isLight = document.documentElement.classList.contains('light');
        if (btn.getAttribute('data-target') === tabName) {
          btn.className = `nav-tab-btn active flex flex-col items-center gap-1 ${
            isLight ? 'text-purple-700' : 'text-brand-purple'
          } transition-colors py-1 px-3 rounded-xl`;
        } else {
          btn.className = `nav-tab-btn flex flex-col items-center gap-1 ${
            isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
          } transition-colors py-1 px-3 rounded-xl`;
        }
      });

      if (window.innerWidth < 768) {
        toggleMobileMenu(false);
        if (tabName === 'chat') {
          const layout = document.querySelector('#view-chat .chat-layout');
          if (layout) layout.classList.remove('mobile-chat-open');
          const chatPanel = document.getElementById('chat-main-panel');
          if (chatPanel) chatPanel.classList.add('hidden');
        }
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function toggleMobileMenu(forceState) {
      const menu = document.getElementById('mobile-menu-panel');
      if (!menu) return;
      const shouldOpen = typeof forceState === 'boolean' ? forceState : menu.classList.contains('hidden');
      menu.classList.toggle('hidden', !shouldOpen);
    }

    function renderChatList(query = "") {
      const container = document.getElementById('chat-list-container');
      if (!container) return;

      container.innerHTML = "";
      const filtered = conversations.filter(chat => chat.name.toLowerCase().includes(query.toLowerCase()));

      filtered.forEach(chat => {
        const lastMsg = chat.messages[chat.messages.length - 1];
        const isActive = chat.id === activeChatId;

        const item = document.createElement('div');
        item.className = `chat-list-item p-3 cursor-pointer flex items-center gap-3 ${isActive ? 'active' : ''}`;
        item.onclick = () => selectChat(chat.id);
        item.innerHTML = `
          <div class="relative shrink-0">
            <img src="${chat.avatar}" class="w-11 h-11 rounded-full object-cover border border-slate-700">
            ${chat.online ? '<span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950"></span>' : ''}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h4 class="font-display font-bold text-xs text-slate-100 truncate">${chat.name}</h4>
              <span class="text-[9px] text-slate-500">${lastMsg ? lastMsg.time : ''}</span>
            </div>
            <p class="text-[11px] text-slate-400 truncate mt-0.5">${lastMsg ? lastMsg.text : ''}</p>
          </div>
          ${chat.unread > 0 ? `<span class="bg-brand-purple text-slate-950 font-black text-[9px] px-1.5 py-0.2 rounded-full">${chat.unread}</span>` : ''}
        `;
        container.appendChild(item);
      });

      const unreadTotal = conversations.reduce((sum, chat) => sum + chat.unread, 0);
      const badge = document.getElementById('unread-total-badge');
      if (badge) {
        badge.textContent = unreadTotal ? `${unreadTotal} Unread` : 'All caught up';
      }
    }

    function selectChat(id) {
      activeChatId = id;
      const chat = conversations.find(item => item.id === id);
      if (!chat) return;

      chat.unread = 0;
      const avatar = document.getElementById('active-chat-avatar');
      const name = document.getElementById('active-chat-name');
      const status = document.getElementById('active-chat-status');
      if (avatar) avatar.src = chat.avatar;
      if (name) name.innerText = chat.name;
      if (status) status.innerText = chat.statusText;

      renderMessages();
      renderChatList();

      const panel = document.getElementById('chat-main-panel');
      if (panel) {
        panel.classList.remove('hidden');
        panel.classList.add('flex');
      }
      const layout = document.querySelector('#view-chat .chat-layout');
      if (layout && window.innerWidth < 768) layout.classList.add('mobile-chat-open');
    }

    function closeMobileChat() {
      const panel = document.getElementById('chat-main-panel');
      if (panel) panel.classList.add('hidden');
      const layout = document.querySelector('#view-chat .chat-layout');
      if (layout) layout.classList.remove('mobile-chat-open');
    }

    function renderMessages() {
      const stream = document.getElementById('chat-stream');
      if (!stream) return;

      stream.innerHTML = '';
      const chat = conversations.find(item => item.id === activeChatId);
      if (!chat) return;

      chat.messages.forEach(msg => {
        const isOut = msg.sender === 'me';
        const div = document.createElement('div');
        div.className = `chat-message ${isOut ? 'outgoing' : 'incoming'}`;
        div.innerHTML = `
          <div class="bubble">
            ${msg.text}
            <span class="chat-meta">${msg.time} ${isOut ? '<i class="fa-solid fa-check-double text-cyan-300"></i>' : ''}</span>
          </div>
        `;
        stream.appendChild(div);
      });
      stream.scrollTop = stream.scrollHeight;
    }

    function handleSendMessage(event) {
      event.preventDefault();
      const input = document.getElementById('chat-input');
      if (!input) return;

      const text = input.value.trim();
      if (!text) return;

      const chat = conversations.find(item => item.id === activeChatId);
      if (!chat) return;

      chat.messages.push({ sender: 'me', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
      input.value = '';
      renderMessages();
      renderChatList();

      setTimeout(() => {
        chat.messages.push({ sender: 'them', text: 'Got it! Let’s lock in.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
        renderMessages();
        renderChatList();
      }, 1000);
    }

    function filterChats() {
      const input = document.getElementById('chat-search');
      renderChatList(input ? input.value : '');
    }

    // --- Render Leaderboard Page ---
    function renderLeaderboard() {
      const podiumContainer = document.getElementById('podium-container');
      const listContainer = document.getElementById('ranks-list-container');
      const userBanner = document.getElementById('user-rank-banner');
      const gameTitle = document.getElementById('leaderboard-game-title');

      const selectedGame = appState.selectedGame || 'EA FC 24';
      const gameData = leaderboardByGame[selectedGame] || leaderboardData;

      if (gameTitle) {
        gameTitle.textContent = selectedGame;
      }

      const top1 = gameData[0];
      const top2 = gameData[1];
      const top3 = gameData[2];

      podiumContainer.innerHTML = `
        <!-- Rank #2 Silver -->
        <div class="glass-card rounded-2xl p-5 border border-slate-700/60 text-center relative order-2 md:order-1 space-y-3 bg-slate-900 dark:bg-slate-900 light:bg-slate-100">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-950 font-display font-black text-xs px-3 py-0.5 rounded-full">
            RANK #2
          </div>
          <img src="${top2.avatar}" class="w-16 h-16 rounded-full mx-auto object-cover border-2 border-slate-300 mt-2">
          <div>
            <h3 class="font-display font-bold text-lg text-slate-100 dark:text-white light:text-slate-900">${top2.gamertag}</h3>
            <span class="text-xs text-brand-purple dark:text-purple-400 light:text-purple-800 font-bold"><i class="fa-solid fa-bolt text-brand-gold"></i> ${top2.points.toLocaleString()} PTS</span>
          </div>
          <div class="pt-2 border-t border-slate-800 light:border-slate-300">
            <span class="inline-block px-3 py-1 rounded-lg bg-slate-800 light:bg-slate-200 text-slate-200 light:text-slate-900 text-xs font-bold">
              PRIZE: ${top2.prize}
            </span>
          </div>
        </div>

        <!-- Rank #1 Gold -->
        <div class="glass-card rounded-2xl p-6 border-2 border-brand-gold text-center relative order-1 md:order-2 space-y-4 bg-slate-900 dark:bg-slate-900 light:bg-slate-100">
          <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-gold text-slate-950 font-display font-black text-xs px-4 py-1 rounded-full">
            <i class="fa-solid fa-crown mr-1"></i> CHAMPION #1
          </div>
          <div class="relative w-20 h-20 mx-auto mt-2">
            <img src="${top1.avatar}" class="w-full h-full rounded-full object-cover border-2 border-brand-gold">
            <span class="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-gold rounded-full flex items-center justify-center text-slate-950 text-xs font-black">1</span>
          </div>
          <div>
            <h3 class="font-display font-black text-xl text-slate-100 dark:text-white light:text-slate-900">${top1.gamertag}</h3>
            <span class="text-sm text-brand-purple dark:text-purple-400 light:text-purple-800 font-extrabold"><i class="fa-solid fa-bolt text-brand-gold"></i> ${top1.points.toLocaleString()} PTS</span>
          </div>
          <div class="pt-2 border-t border-slate-800 light:border-slate-300">
            <span class="inline-block px-4 py-1.5 rounded-xl bg-brand-gold/20 light:bg-amber-100 text-brand-gold dark:text-amber-300 light:text-amber-900 text-xs font-black border border-brand-gold/40">
              PRIZE: ${top1.prize}
            </span>
          </div>
        </div>

        <!-- Rank #3 Bronze -->
        <div class="glass-card rounded-2xl p-5 border border-amber-900/50 text-center relative order-3 space-y-3 bg-slate-900 dark:bg-slate-900 light:bg-slate-100">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white font-display font-black text-xs px-3 py-0.5 rounded-full">
            RANK #3
          </div>
          <img src="${top3.avatar}" class="w-16 h-16 rounded-full mx-auto object-cover border-2 border-amber-600 mt-2">
          <div>
            <h3 class="font-display font-bold text-lg text-slate-100 dark:text-white light:text-slate-900">${top3.gamertag}</h3>
            <span class="text-xs text-brand-purple dark:text-purple-400 light:text-purple-800 font-bold"><i class="fa-solid fa-bolt text-brand-gold"></i> ${top3.points.toLocaleString()} PTS</span>
          </div>
          <div class="pt-2 border-t border-slate-800 light:border-slate-300">
            <span class="inline-block px-3 py-1 rounded-lg bg-slate-800 light:bg-slate-200 text-slate-200 light:text-slate-900 text-xs font-bold">
              PRIZE: ${top3.prize}
            </span>
          </div>
        </div>
      `;

      listContainer.innerHTML = '';
      const ranks4to10 = gameData.slice(3, 10);

      ranks4to10.forEach(player => {
        const isUser = player.isCurrent;
        const row = document.createElement('div');
        row.className = `glass-card p-3.5 rounded-xl flex items-center justify-between gap-4 border ${
          isUser ? 'border-brand-purple bg-brand-purple/10 light:bg-purple-50' : 'border-slate-800 light:border-slate-300'
        } cursor-pointer hover:border-brand-purple/50 transition-all`;
        row.setAttribute('onclick', `openPlayerProfile(${JSON.stringify(player).replace(/"/g, '&quot;')})`);

        row.innerHTML = `
          <div class="flex items-center gap-3">
            <span class="font-display font-bold text-sm w-6 text-slate-400 light:text-slate-700">#${player.rank}</span>
            <img src="${player.avatar}" class="w-9 h-9 rounded-full object-cover border border-slate-700 light:border-slate-300">
            <div>
              <div class="font-display font-semibold text-sm text-slate-100 dark:text-white light:text-slate-900 flex items-center gap-2">
                ${player.gamertag}
                ${isUser ? '<span class="bg-brand-purple text-white text-[10px] font-black px-1.5 py-0.2 rounded">YOU</span>' : ''}
              </div>
              <span class="text-[11px] text-brand-emerald dark:text-emerald-400 light:text-emerald-700 font-bold"><i class="fa-solid fa-circle-check text-[9px]"></i> ${player.status}</span>
            </div>
          </div>

          <div class="text-right">
            <div class="font-display font-bold text-sm text-brand-purple dark:text-purple-400 light:text-purple-800"><i class="fa-solid fa-bolt text-brand-gold text-xs"></i> ${player.points.toLocaleString()}</div>
            <div class="text-[10px] text-slate-400 light:text-slate-700">Points</div>
          </div>
        `;
        listContainer.appendChild(row);
      });

      const currentUserGameEntry = gameData.find(player => player.gamertag === appState.currentUser.gamertag) || {
        rank: appState.currentUser.rank,
        points: appState.currentUser.points,
        prize: 'Finalist Spot'
      };

      userBanner.innerHTML = `
        <div class="flex items-center gap-3">
          <img src="${appState.currentUser.avatar}" class="w-12 h-12 rounded-full object-cover border-2 border-brand-purple">
          <div>
            <div class="text-xs text-slate-400 light:text-slate-700">Your Current ${selectedGame} Ranking</div>
            <div class="font-display font-black text-lg text-slate-100 dark:text-white light:text-slate-900">${appState.currentUser.gamertag}</div>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="text-center">
            <div class="text-[10px] text-slate-400 light:text-slate-700 uppercase font-semibold">Rank</div>
            <div class="font-display font-bold text-brand-purple dark:text-purple-400 light:text-purple-800 text-base">#${currentUserGameEntry.rank}</div>
          </div>
          <div class="text-center">
            <div class="text-[10px] text-slate-400 light:text-slate-700 uppercase font-semibold">Points</div>
            <div class="font-display font-bold text-brand-gold dark:text-amber-400 light:text-amber-700 text-base">${currentUserGameEntry.points.toLocaleString()}</div>
          </div>
          <button onclick="navigateTo('tournaments')" class="px-3.5 py-2 rounded-xl bg-brand-purple hover:bg-purple-700 text-white font-bold text-xs transition-colors">
            Earn More PTS
          </button>
        </div>
      `;
    }

    // --- Render Profile View Details ---
    function renderProfile() {
      const profileUser = getProfileUser();
      const isOwnProfile = profileUser.gamertag === appState.currentUser.gamertag;

      if (document.getElementById('profile-img')) document.getElementById('profile-img').src = profileUser.avatar;
      if (document.getElementById('profile-gamertag')) document.getElementById('profile-gamertag').innerText = profileUser.gamertag;
      if (document.getElementById('profile-email')) document.getElementById('profile-email').innerText = profileUser.email;
      if (document.getElementById('header-points')) document.getElementById('header-points').innerText = profileUser.points.toLocaleString();
      if (document.getElementById('profile-balance')) document.getElementById('profile-balance').innerText = profileUser.balance.toLocaleString();
      if (document.getElementById('header-balance')) document.getElementById('header-balance').innerText = `${profileUser.balance.toLocaleString()} ETB`;
      if (document.getElementById('profile-rank')) document.getElementById('profile-rank').innerText = profileUser.rank;
      if (document.getElementById('bio-text')) document.getElementById('bio-text').innerText = `"${profileUser.bio}"`;

      const profileLevel = Math.max(1, Math.floor((profileUser.points || 0) / 1000) + 22);
      const profileLevelNum = document.getElementById('profile-level-num');
      if (profileLevelNum) profileLevelNum.innerText = profileLevel;

      const bioEditBox = document.getElementById('bio-edit-box');
      const editBioBtn = document.getElementById('edit-bio-btn');
      if (bioEditBox) bioEditBox.classList.add('hidden');
      if (editBioBtn) editBioBtn.style.display = isOwnProfile ? 'inline-flex' : 'none';

      const cashoutBtn = document.querySelector('#view-profile button[onclick="navigateTo(\'cashout\')"]');
      if (cashoutBtn) cashoutBtn.style.display = isOwnProfile ? 'inline-flex' : 'none';

      const addGameBtn = document.querySelector('#active-games-list')?.closest('.glass-card')?.querySelector('button[onclick="openAddGameModal()"]');
      if (addGameBtn) addGameBtn.style.display = isOwnProfile ? 'inline-flex' : 'none';

      const editHandlesBtn = document.querySelector('#game-handles-list')?.closest('.glass-card')?.querySelector('button[onclick="openEditHandlesModal()"]');
      if (editHandlesBtn) editHandlesBtn.style.display = isOwnProfile ? 'inline-flex' : 'none';

      const pts = profileUser.points;
      const currentLevel = Math.floor(pts / 1000) + 22;
      const ptsInLevel = pts % 1000;
      const progressPercent = Math.min(100, Math.max(5, (ptsInLevel / 1000) * 100));

      const lvlText = document.getElementById('header-level-text');
      if (lvlText) lvlText.innerText = `LVL ${currentLevel}`;

      const progressBar = document.getElementById('header-level-progress-bar');
      if (progressBar) progressBar.style.width = `${progressPercent}%`;

      const gamesList = document.getElementById('active-games-list');
      gamesList.innerHTML = '';
      profileUser.playingGames.forEach((game, index) => {
        const item = document.createElement('div');
        item.className = "p-3 rounded-xl bg-slate-900/80 light:bg-slate-100 border border-slate-800 light:border-slate-300 flex items-center gap-3 relative group";
        item.innerHTML = `
          <div class="w-9 h-9 rounded-lg bg-brand-purple/20 text-brand-purple flex items-center justify-center text-base">
            <i class="fa-solid ${game.icon || 'fa-gamepad'}"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-bold text-xs text-slate-100 dark:text-white light:text-slate-900 truncate">${game.name}</div>
            <div class="text-[10px] text-slate-400 light:text-slate-600 truncate">${game.category}</div>
          </div>
          ${isOwnProfile ? `<button onclick="removeGame(${index})" class="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-slate-300 text-xs transition-opacity"><i class="fa-solid fa-xmark"></i></button>` : ''}
        `;
        gamesList.appendChild(item);
      });

      const handlesList = document.getElementById('game-handles-list');
      handlesList.innerHTML = '';
      const handleEntries = Object.entries(profileUser.handles || {});
      handleEntries.forEach(([key, value]) => {
        const label = key.toUpperCase().replace(/_/g, ' ');
        const row = document.createElement('div');
        row.className = 'p-2.5 rounded-xl bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-300 flex items-center justify-between text-xs';
        row.innerHTML = `
          <span class="text-slate-400 light:text-slate-600 font-medium"><i class="fa-solid ${key === 'telebirr' ? 'fa-mobile-screen' : key === 'cbe' ? 'fa-building-columns' : key === 'ea' ? 'fa-futbol' : 'fa-crosshairs'} text-brand-emerald mr-2"></i> ${label}</span>
          <span class="font-mono text-slate-200 light:text-slate-800">${value}</span>
        `;
        handlesList.appendChild(row);
      });
    }

    // --- Render Cash Out Page ---
    function renderCashout() {
      document.getElementById('cashout-available-balance').innerText = `${appState.currentUser.balance.toLocaleString()} ETB`;
      document.getElementById('cashout-pending-balance').innerText = `${appState.currentUser.pendingBalance.toLocaleString()} ETB`;
      document.getElementById('cashout-total-withdrawn').innerText = `${appState.currentUser.totalWithdrawn.toLocaleString()} ETB`;

      document.getElementById('cashout-amount').max = appState.currentUser.balance;
      document.getElementById('cashout-account').value = appState.currentUser.handles.telebirr;
      document.getElementById('cashout-holder').value = appState.currentUser.gamertag;

      const historyList = document.getElementById('cashout-history-list');
      historyList.innerHTML = '';

      appState.currentUser.transactions.forEach(tx => {
        const isCompleted = tx.status === 'Completed';
        const item = document.createElement('div');
        item.className = "p-3 rounded-xl bg-slate-900/80 light:bg-slate-100 border border-slate-800 light:border-slate-300 space-y-1.5";
        item.innerHTML = `
          <div class="flex items-center justify-between text-xs font-bold">
            <span class="text-slate-100 dark:text-white light:text-slate-900">${tx.gateway}</span>
            <span class="text-brand-emerald dark:text-emerald-400 light:text-emerald-700">${tx.amount}</span>
          </div>
          <div class="flex items-center justify-between text-[10px] text-slate-400 light:text-slate-600">
            <span>${tx.txId} • ${tx.date}</span>
            <span class="${isCompleted ? 'text-brand-emerald' : 'text-brand-gold'} font-bold flex items-center gap-1">
              <i class="fa-solid ${isCompleted ? 'fa-circle-check' : 'fa-clock'} text-[9px]"></i> ${tx.status}
            </span>
          </div>
        `;
        historyList.appendChild(item);
      });
    }

    function setCashoutAmount(amt) {
      document.getElementById('cashout-amount').value = amt;
    }

    function handleCashoutSubmit(event) {
      event.preventDefault();
      const amt = parseInt(document.getElementById('cashout-amount').value);
      const gateway = appState.selectedGateway;
      const account = document.getElementById('cashout-account').value;

      if (!amt || amt < 100) {
        showToast("Minimum withdrawal amount is 100 ETB.");
        return;
      }

      if (amt > appState.currentUser.balance) {
        showToast("Insufficient balance for this withdrawal.");
        return;
      }

      appState.currentUser.balance -= amt;
      appState.currentUser.pendingBalance += amt;

      appState.currentUser.transactions.unshift({
        txId: `TX-${Math.floor(10000 + Math.random() * 90000)}`,
        gateway: gateway,
        amount: `${amt.toLocaleString()} ETB`,
        date: "Just Now",
        status: "Pending"
      });

      renderCashout();
      renderProfile();
      showToast(`Withdrawal request for ${amt.toLocaleString()} ETB via ${gateway} submitted!`);
    }

    // --- Render Tournaments Grid ---
    function renderTournaments(filter = 'all') {
      const grid = document.getElementById('tournaments-grid');
      const homeFeatured = document.getElementById('home-featured-tournaments');
      grid.innerHTML = '';

      const filtered = filter === 'all' ? tournamentsData : tournamentsData.filter(t => t.genre === filter);

      filtered.forEach(t => {
        const card = document.createElement('div');
        card.className = "glass-card rounded-2xl overflow-hidden border border-slate-800 light:border-slate-300 flex flex-col justify-between";
        card.innerHTML = `
          <div>
            <div class="relative h-36 overflow-hidden">
              <img src="${t.image}" class="w-full h-full object-cover">
              <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-950/90 text-brand-purple border border-brand-purple/40">
                ${t.status}
              </span>
              <span class="absolute bottom-2 right-3 font-display font-black text-base text-brand-gold bg-slate-950/80 px-2 py-0.5 rounded-lg">
                ${t.prizePool}
              </span>
            </div>

            <div class="p-4 space-y-3">
              <div>
                <span class="text-[10px] font-bold text-brand-purple uppercase">${t.game} • ${t.genre}</span>
                <h3 class="font-display font-bold text-base text-slate-100 dark:text-white light:text-slate-900 leading-snug">${t.title}</h3>
              </div>

              <div class="flex items-center justify-between text-xs text-slate-400 light:text-slate-600 pt-1 border-t border-slate-800/80 light:border-slate-200">
                <span><i class="fa-solid fa-ticket mr-1"></i> ${t.entry}</span>
                <span class="text-brand-purple font-bold"><i class="fa-solid fa-bolt text-brand-gold mr-1"></i> ${t.pointsReward}</span>
              </div>
            </div>
          </div>

          <div class="p-4 pt-0">
            <button onclick="joinTournament('${t.title}')" class="w-full py-2.5 rounded-xl bg-brand-purple hover:bg-purple-700 text-white font-display font-black text-xs transition-colors">
              JOIN TOURNAMENT
            </button>
          </div>
        `;
        grid.appendChild(card);
      });

      if (homeFeatured && homeFeatured.children.length === 0) {
        tournamentsData.slice(0, 3).forEach(t => {
          const card = document.createElement('div');
          card.className = "glass-card rounded-xl p-4 border border-slate-800 light:border-slate-300 flex items-center justify-between gap-4";
          card.innerHTML = `
            <div class="flex items-center gap-3">
              <img src="${t.image}" class="w-12 h-12 rounded-lg object-cover border border-slate-700">
              <div>
                <h4 class="font-bold text-sm text-slate-100 dark:text-white light:text-slate-900">${t.title}</h4>
                <div class="text-xs text-slate-400 light:text-slate-600">${t.game} • <span class="text-brand-gold font-bold">${t.prizePool}</span></div>
              </div>
            </div>
            <button onclick="navigateTo('tournaments')" class="px-3 py-1.5 rounded-lg bg-brand-purple text-white font-bold text-xs">
              View
            </button>
          `;
          homeFeatured.appendChild(card);
        });
      }
    }

    // --- Render Discover / Search Players ---
    function renderPlayers() {
      const searchVal = (document.getElementById('player-search-input').value || '').toLowerCase();
      const sortVal = appState.playerSort;
      const grid = document.getElementById('players-grid');
      grid.innerHTML = '';

      let filtered = competitorsData.filter(p => 
        p.gamertag.toLowerCase().includes(searchVal) || 
        (p.games && p.games.toLowerCase().includes(searchVal))
      );

      if (sortVal === 'points-desc') {
        filtered.sort((a, b) => b.points - a.points);
      } else if (sortVal === 'rank-asc') {
        filtered.sort((a, b) => a.rank - b.rank);
      } else if (sortVal === 'name-asc') {
        filtered.sort((a, b) => a.gamertag.localeCompare(b.gamertag));
      }

      filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = "glass-card rounded-2xl p-4 border border-slate-800 light:border-slate-300 space-y-3";
        card.innerHTML = `
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img src="${p.avatar}" class="w-11 h-11 rounded-full object-cover border border-slate-700">
              <div>
                <h3 class="font-display font-bold text-sm text-slate-100 dark:text-white light:text-slate-900">${p.gamertag}</h3>
                <span class="text-[11px] text-slate-400 light:text-slate-600">Ethiopia Rank #${p.rank}</span>
              </div>
            </div>
            <div class="text-right">
              <div class="font-display font-bold text-sm text-brand-purple"><i class="fa-solid fa-bolt text-brand-gold text-xs"></i> ${p.points}</div>
              <div class="text-[10px] text-slate-500">PTS</div>
            </div>
          </div>

          <div class="text-xs text-slate-400 light:text-slate-600 bg-slate-900/50 light:bg-slate-100 p-2 rounded-lg flex items-center justify-between">
            <span>Games: ${p.games || 'EA FC 24, PUBG'}</span>
            <span class="text-brand-emerald text-[10px] font-bold">Verified</span>
          </div>

          <div class="flex gap-2">
            <button onclick="showToast('Friend request sent to ${p.gamertag}!')" class="flex-1 py-1.5 rounded-lg bg-slate-800 light:bg-slate-200 text-xs font-semibold text-slate-200 light:text-slate-800">
              <i class="fa-solid fa-user-plus mr-1 text-brand-purple"></i> Add
            </button>
            <button onclick="openPlayerProfile(${JSON.stringify(p).replace(/"/g, '&quot;')})" class="flex-1 py-1.5 rounded-lg bg-brand-purple/20 border border-brand-purple/40 text-xs font-bold text-brand-purple">
              View Profile
            </button>
          </div>
        `;
        grid.appendChild(card);
      });
    }

    function filterTournaments(category) {
      document.querySelectorAll('.tourn-filter-btn').forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
          btn.className = "tourn-filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-purple text-white font-display transition-all";
        } else {
          btn.className = "tourn-filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 light:bg-slate-200 text-slate-300 light:text-slate-800 font-display transition-all";
        }
      });
      renderTournaments(category);
    }

    function searchPlayers() {
      renderPlayers();
    }

    function toggleAuthTab(mode) {
      appState.authMode = mode;
      const loginTab = document.getElementById('auth-tab-login');
      const signupTab = document.getElementById('auth-tab-signup');
      const gamertagField = document.getElementById('gamertag-field');
      const title = document.getElementById('auth-title');
      const subtitle = document.getElementById('auth-subtitle');
      const submitBtn = document.getElementById('auth-submit-btn');

      if (mode === 'signup') {
        signupTab.className = "flex-1 py-2 rounded-lg text-xs sm:text-sm font-display font-bold transition-all bg-brand-purple text-white";
        loginTab.className = "flex-1 py-2 rounded-lg text-xs sm:text-sm font-display font-bold text-slate-400 light:text-slate-600 hover:text-slate-200 transition-all";
        gamertagField.classList.remove('hidden');
        title.innerText = "CREATE ETHIOPIA ACCOUNT";
        subtitle.innerText = "Register your gaming ID to start collecting ETB prize money.";
        submitBtn.innerText = "SIGN UP & START PLAYING";
      } else {
        loginTab.className = "flex-1 py-2 rounded-lg text-xs sm:text-sm font-display font-bold transition-all bg-brand-purple text-white";
        signupTab.className = "flex-1 py-2 rounded-lg text-xs sm:text-sm font-display font-bold text-slate-400 light:text-slate-600 hover:text-slate-200 transition-all";
        gamertagField.classList.add('hidden');
        title.innerText = "WELCOME BACK, GAMER";
        subtitle.innerText = "Enter your credentials or Telebirr registered phone to continue.";
        submitBtn.innerText = "LOGIN TO NEXUS";
      }
    }

    function handleAuthSubmit(event) {
      event.preventDefault();
      const email = document.getElementById('auth-email').value;
      const tag = document.getElementById('auth-gamertag').value;

      if (appState.authMode === 'signup' && tag) {
        appState.currentUser.gamertag = tag;
      } else {
        appState.currentUser.gamertag = "Fita";
      }
      if (email) {
        appState.currentUser.email = email;
      }

      document.getElementById('header-gamertag').innerText = appState.currentUser.gamertag;
      document.getElementById('auth-btn-text').innerText = appState.currentUser.gamertag;

      renderProfile();
      showToast(`Welcome ${appState.currentUser.gamertag}!`);
      navigateTo('home');
    }

    function toggleBioEdit() {
      const box = document.getElementById('bio-edit-box');
      const text = document.getElementById('bio-text');
      const input = document.getElementById('bio-input');

      if (box.classList.contains('hidden')) {
        input.value = appState.currentUser.bio;
        box.classList.remove('hidden');
        text.classList.add('hidden');
      } else {
        box.classList.add('hidden');
        text.classList.remove('hidden');
      }
    }

    function saveBio() {
      const input = document.getElementById('bio-input').value;
      if (input.trim()) {
        appState.currentUser.bio = input.trim();
        renderProfile();
        showToast("Bio updated!");
      }
      toggleBioEdit();
    }

    function triggerAvatarChange() {
      const urls = [
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&auto=format&fit=crop&q=80"
      ];
      const nextAvatar = urls[(urls.indexOf(appState.currentUser.avatar) + 1) % urls.length];
      appState.currentUser.avatar = nextAvatar;

      document.getElementById('header-avatar').src = nextAvatar;
      renderProfile();
      renderLeaderboard();
      showToast("Avatar updated!");
    }

    function openAddGameModal() {
      document.getElementById('add-game-modal').classList.remove('hidden');
    }

    function saveNewGame() {
      const title = document.getElementById('new-game-title').value;
      const genre = document.getElementById('new-game-genre').value;
      if (title) {
        appState.currentUser.playingGames.push({
          name: title,
          category: genre || "Tournament Title",
          icon: "fa-gamepad"
        });
        renderProfile();
        closeModal('add-game-modal');
        showToast(`Added ${title}!`);
      }
    }

    function removeGame(index) {
      appState.currentUser.playingGames.splice(index, 1);
      renderProfile();
      showToast("Game removed.");
    }

    function openEditHandlesModal() {
      document.getElementById('handle-telebirr').value = appState.currentUser.handles.telebirr;
      document.getElementById('handle-ea').value = appState.currentUser.handles.ea;
      document.getElementById('handle-pubg').value = appState.currentUser.handles.pubg;
      document.getElementById('edit-handles-modal').classList.remove('hidden');
    }

    function saveHandles() {
      appState.currentUser.handles.telebirr = document.getElementById('handle-telebirr').value;
      appState.currentUser.handles.ea = document.getElementById('handle-ea').value;
      appState.currentUser.handles.pubg = document.getElementById('handle-pubg').value;
      renderProfile();
      renderCashout();
      closeModal('edit-handles-modal');
      showToast("Accounts & Banking details updated!");
    }

    function closeModal(id) {
      const modalIds = id ? [id] : ['add-game-modal', 'edit-handles-modal'];
      modalIds.forEach((modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('hidden');
      });
    }

    function joinTournament(title) {
      showToast(`Registered for ${title}! Telebirr room confirmation sent.`);
    }

    function showToast(message) {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = "glass-card border border-brand-purple text-slate-100 dark:text-white light:text-slate-900 text-xs font-semibold px-4 py-3 rounded-xl flex items-center gap-2 pointer-events-auto transition-all";
      toast.innerHTML = `<i class="fa-solid fa-circle-check text-brand-emerald text-sm"></i> <span>${message}</span>`;
      container.appendChild(toast);

      setTimeout(() => {
        toast.remove();
      }, 3000);
    }

    window.onload = function() {
      renderChatList();
      selectChat('c1');
      renderLeaderboard();
      renderProfile();
      renderCashout();
      renderTournaments();
      renderPlayers();
      navigateTo('home');
    };

    (function(){
      const cards=document.querySelectorAll('.glass-card');
      cards.forEach(card=>{
        card.classList.add('rb-spotlight');
        card.addEventListener('pointermove',e=>{
          const r=card.getBoundingClientRect();
          card.style.setProperty('--mx',(e.clientX-r.left)+'px');
          card.style.setProperty('--my',(e.clientY-r.top)+'px');
        },{passive:true});
      });
      const revealTargets=document.querySelectorAll('#view-home > div, #view-home .glass-card, #view-rankings > div, #view-profile > div, #view-tournaments > div');
      revealTargets.forEach(el=>el.classList.add('rb-reveal'));
      if('IntersectionObserver' in window){
        const observer=new IntersectionObserver(entries=>{
          entries.forEach(entry=>{
            if(entry.isIntersecting){entry.target.classList.add('rb-visible');observer.unobserve(entry.target);}
          });
        },{threshold:.08});
        revealTargets.forEach(el=>observer.observe(el));
      } else revealTargets.forEach(el=>el.classList.add('rb-visible'));
      const navObserver=new MutationObserver(()=>{
        document.querySelectorAll('.view-panel:not(.hidden) .rb-reveal').forEach(el=>{
          if(el.getBoundingClientRect().top < innerHeight*.92) el.classList.add('rb-visible');
        });
      });
      document.querySelectorAll('.view-panel').forEach(v=>navObserver.observe(v,{attributes:true,attributeFilter:['class']}));
    })();
