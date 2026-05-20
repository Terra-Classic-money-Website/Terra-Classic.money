export type EcosystemEntry = {
  name: string;
  summary: string;
  href?: string;
  avatar?: string;
  avatarAlt?: string;
  badge?: string;
  status?: string;
};

export type EcosystemCategory = {
  id: string;
  title: string;
  description: string;
  icon: string;
  entries: EcosystemEntry[];
};

export const ecosystemCategories: EcosystemCategory[] = [
  {
    id: "applications",
    title: "Applications",
    description:
      "Apps, DeFi products, launchpads, marketplaces, and aggregators",
    icon: "grid",
    entries: [
      {
        name: "BigbangX",
        summary: "NFT marketplace",
        href: "https://bigbangx.io",
        avatar:
          "https://framerusercontent.com/images/KBgYlLn8EVUKPwqywWKPk2vlxZ8.jpg?width=400&height=400",
        avatarAlt: "BigbangX NFT marketplace for Terra Classic digital art.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Cookie.pay",
        summary: "Payments",
        href: "https://lunc.tools/cookie-pay",
        avatar:
          "https://framerusercontent.com/images/59BhtTUdDUeu8dwvdVtxCgPOp4.png?width=58&height=59",
        avatarAlt: "Cookie.pay crypto-payments gateway for LUNC and USTC.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Juris Protocol",
        summary: "Lending & borrowing",
        href: "https://jurisprotocol.com",
        avatar:
          "https://framerusercontent.com/images/obdBBFwqR1y1ObX0POf8cyZ6Q.jpg?width=400&height=400",
        avatarAlt:
          "Juris Protocol lending & borrowing dApp (WIP) on Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "LbunProject",
        summary: "Orderbook",
        href: "https://orderbook.lbunproject.tech",
        avatar:
          "https://framerusercontent.com/images/X4rNqoWaEj9NleuXFki8pXh1kOc.png?width=286&height=286",
        avatarAlt: "LbunProject on-chain order-book for Terra Classic tokens.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Miata",
        summary: "NFT marketplace",
        href: "https://miata.io",
        avatar:
          "https://framerusercontent.com/images/pA9YyUtQJyRAnWEP7u3Up5I24.png?width=128&height=133",
        avatarAlt: "Miata NFT marketplace for Terra Classic NFT collections.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "NFT.lunc.tools",
        summary: "NFT marketplace",
        href: "https://nft.lunc.tools",
        avatar:
          "https://framerusercontent.com/images/6Y6RbeQzw6NOgHmPfQc7KyoTZNY.png?width=291&height=287",
        avatarAlt: "Truely decentralised NFTs on Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Orbit Wire",
        summary: "Aggregator",
        href: "https://orbitwire.io",
        avatar:
          "https://framerusercontent.com/images/nD3LSSHBcw0Z9MSPFIlqd8r72RA.png?width=1024&height=1024",
        avatarAlt:
          "Selenium synthetics platform (WIP) for Terra Classic assets.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Selenium",
        summary: "Synthetics platform",
        href: "https://selenium.finance",
        avatar:
          "https://framerusercontent.com/images/nDxyTeKhjMAyhCZrkP8UvlPkmc.png?width=250&height=250",
        avatarAlt:
          "Selenium synthetics platform (WIP) for Terra Classic assets.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Terra Casino",
        summary: "Leveraged trading",
        href: "https://terracasino.io/trading/BTC",
        avatar:
          "https://framerusercontent.com/images/YKbWdVjVBvoAfNZGToDsTSjPc4.jpg?width=495&height=495",
        avatarAlt:
          "Leveraged trading (BTC, ETH, BNB, XRP, TURBOWAVE) on Terra Casino",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Terraport Token Factory",
        summary: "Launchpad",
        href: "https://terraport.finance/development/token",
        avatar:
          "https://framerusercontent.com/images/C1VRQ896uLUDqqphvN48jH6o0dM.png?width=64&height=64",
        avatarAlt:
          "Terraport Token Factory for launching Terra Classic tokens.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "TERRA.pump",
        summary: "Launchpad",
        href: "https://terrapump.fun",
        avatar:
          "https://framerusercontent.com/images/mwa5TPKEg8mtKojpogZ5if6Zc0.png?width=512&height=512",
        avatarAlt: "TERRA.pump launchpad accelerating Terra Classic startups.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "THEIA",
        summary: "Aggregator",
        href: "https://theia.trading",
        avatar:
          "https://framerusercontent.com/images/HiAfXnH8frCjOk79NOGruZLMu6g.png?width=400&height=400",
        avatarAlt: "Theia price aggregator covering Terra Classic markets.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Vyntrex",
        summary: "Aggregator",
        href: "https://vyntrex.io",
        avatar:
          "https://framerusercontent.com/images/mVz8VTpJuFAMMZNcupwh8cFds.png?width=120&height=120",
        avatarAlt: "Vyntrex price aggregator covering Terra Classic markets.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Coinhall",
        summary: "Aggregator",
        href: "https://coinhall.org/terraclassic/terra1l7vy20x940je7lskm6x9s839vjsmekz9k9mv7g",
        avatar:
          "https://framerusercontent.com/images/Bs4kzygCm2K4hAR3dEWmoqgAqHQ.png?scale-down-to=512&width=773&height=773",
        avatarAlt: "Coinhall aggregator showing Terra Classic prices & charts.",
      },
      {
        name: "Sonic",
        summary: "Social / Messenger",
        href: "https://www.sonikchain.com",
        avatar:
          "https://framerusercontent.com/images/8CVMLoJPoj1enblm5OkGUHs7k.png?width=64&height=64",
        avatarAlt:
          "Sonic decentralized social/messenger dApp on Terra Classic.",
      },
    ],
  },
  {
    id: "entertainment",
    title: "Entertainment",
    description: "Games, metaverse, festivals, and culture projects",
    icon: "spark",
    entries: [
      {
        name: "Air Force Lunc",
        summary: "Game",
        href: "https://www.bigbangx.io/air-force-lunc",
        avatar:
          "https://framerusercontent.com/images/VMyfzMIRTgVgomM88dZkP6relh8.png?width=100&height=100",
        avatarAlt: "Air Force Lunc play-to-earn game on Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "BruteMove!",
        summary: "Game",
        href: "https://brutemove.net",
        avatar:
          "https://framerusercontent.com/images/cPIkmJ5mB9pQxhjb1VdfwEFrkc.png?width=626&height=626",
        avatarAlt: "Galactic Shift WIP blockchain game for Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Galactic Shift",
        summary: "Game",
        href: "https://galacticshift.io",
        avatar:
          "https://framerusercontent.com/images/k8YGB1dJHqKbhpocl0zW19GfJwo.jpg?width=400&height=400",
        avatarAlt: "Galactic Shift WIP blockchain game for Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Garuda The Protector",
        summary: "Game",
        href: "https://play.google.com/store/apps/details?id=com.GarudaNodes.GarudaTheProtector3&pcampaignid=web_share",
        avatar:
          "https://framerusercontent.com/images/y4Ml5QrfwBZVv4fUA1kyrV8vK9I.jpg?width=400&height=400",
        avatarAlt:
          "Garuda The Protector action game in the Terra Classic universe.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Legends of Terratria",
        summary: "Game",
        href: "https://aetherverge.io/games/lot",
        avatar:
          "https://framerusercontent.com/images/FtnZyiDzr6l8H6wqWjevuQsHhI.png?width=480&height=488",
        avatarAlt:
          "Legends of Terratria role-playing game (WIP) on Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Lunc Zombie",
        summary: "Game",
        href: "https://play.google.com/store/apps/details?id=com.Unimasoft.Commando&pcampaignid=web_share",
        avatar:
          "https://framerusercontent.com/images/B3GeaHiL0ZYgq5t0SrFksxcui0.png?width=240&height=240",
        avatarAlt: "Lunc Zombie shooter game earning LUNC rewards.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Luncverse",
        summary: "Metaverse",
        href: "https://luncverse.io",
        avatar:
          "https://framerusercontent.com/images/NolgxHr8YmF5YNOYpan5EYsf8zk.jpg?width=205&height=206",
        avatarAlt: "Luncvers3 metaverse (WIP) built on Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "LUNC Tools World",
        summary: "Game",
        href: "https://world.lunc.tools",
        avatar:
          "https://framerusercontent.com/images/WyRSKEWmqYFmlYTlrhZeeHc4yA.png?width=1116&height=372",
        avatarAlt: "LUNC tools World game on Terra Classic",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "MIOFF",
        summary: "Festival",
        href: "https://mioff-token.com/",
        avatar:
          "https://framerusercontent.com/images/WDjU2me4i6tqFhFzjiOQ5oexY7Y.jpg?scale-down-to=512&width=1024&height=1024",
        avatarAlt: "MIOFF music & arts festival powered by Terra Classic NFTs.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "PENGS",
        summary: "Game",
        href: "https://x.com/pixel_pengs",
        avatar:
          "https://framerusercontent.com/images/VNICIUAT2A8CloXQJD4hYf43do.jpg?width=300&height=300",
        avatarAlt: "PENGS casual game (WIP) using LUNC tokens.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "TRITIUM",
        summary: "Game",
        href: "https://play.terratritium.com",
        avatar:
          "https://framerusercontent.com/images/yDCJLJ8OxA1IJpiqAclJuEfikhA.jpg?width=155&height=155",
        avatarAlt: "TRITIUM arcade game rewarding Luna Classic players.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Terra Casino",
        summary: "Casino and live poker",
        href: "https://terracasino.io",
        avatar:
          "https://framerusercontent.com/images/YKbWdVjVBvoAfNZGToDsTSjPc4.jpg?width=495&height=495",
        avatarAlt: "Terra Casino online casino accepting LUNC & USTC.",
      },
    ],
  },
  {
    id: "information",
    title: "Blockchain information",
    description: "Forums, news, safety references, and ecosystem information",
    icon: "info",
    entries: [
      {
        name: "Agora",
        summary: "Official forum",
        href: "https://agora.terra-classic.money",
        avatar:
          "https://framerusercontent.com/images/p9coKr28Aq4RO8CXf2W9BtIpYU.png?scale-down-to=512&width=679&height=694",
        avatarAlt: "Discourse - Unofficial discussion forum for Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "LuncDaily",
        summary: "News website",
        href: "https://luncdaily.com",
        avatar:
          "https://framerusercontent.com/images/ZYOTb6sG4Sp7dUm8HmnJQYoP5QE.png?scale-down-to=512&width=1280&height=1280",
        avatarAlt: "LuncDaily news site covering Terra Classic updates.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "LUNC Burner",
        summary: "News website",
        href: "https://lunc.tech",
        avatar:
          "https://framerusercontent.com/images/DuEi811MTJ1q69HdIiuPLx0IAIk.png?width=250&height=250",
        avatarAlt: "LUNC Burner portal tracking Terra Classic token burns.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "LuncToken.org",
        summary: "News website",
        href: "https://www.lunctoken.org",
        avatar:
          "https://framerusercontent.com/images/kKxwPkhMSP3nJMrNyPyyjTfu20.webp?width=100&height=100",
        avatarAlt: "LuncToken.org news and analytics for LUNC.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Terraclassic.network",
        summary: "News website",
        href: "https://terraclassic.network",
        avatar:
          "https://framerusercontent.com/images/6reEiMx9DgSGelJen6PSpmFkS20.png?width=64&height=64",
        avatarAlt: "Terraclassic.network community news for Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "CertiK Audit",
        summary: "",
        href: "https://skynet.certik.com/projects/terra",
        avatar:
          "https://framerusercontent.com/images/Qe6nQOcYQmditYqDrONOjE6XQS8.png?width=225&height=225",
        avatarAlt: "CertiK security audit report for Terra Classic projects.",
      },
      {
        name: "Common.xyz",
        summary: "Unofficial forum",
        href: "https://forum.terra-classic.money",
        avatar:
          "https://framerusercontent.com/images/0xgvFdWSbvzyoNipEnKfLNyckYE.png?width=373&height=354",
        avatarAlt: "Common.xyz official discussion forum for Terra Classic.",
      },
    ],
  },
  {
    id: "wallets",
    title: "Wallets",
    description: "Wallets and account tools for Terra Classic users",
    icon: "wallet",
    entries: [
      {
        name: "LUNCdash",
        summary: "",
        href: "https://luncdash.com",
        avatar:
          "https://framerusercontent.com/images/yARX8rWbcc6YTokStcaeE5hYolQ.jpeg?scale-down-to=512&width=1280&height=1243",
        avatarAlt: "LUNCdash dashboard & wallet for Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Orbitar",
        summary: "",
        href: "https://orbitar.app",
        avatar:
          "https://framerusercontent.com/images/rXhx36Kfk9SmiDD5vu4AX6ia1gM.png?width=512&height=512",
        avatarAlt: "Orbitar Mobile: Your Crypto Universe, Securely in Orbit!",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Cosmostation Mobile",
        summary: "",
        href: "https://www.cosmostation.io/products/cosmostation_mobile",
        avatar:
          "https://framerusercontent.com/images/sJ0BdGV3pPFfvioxReZLXhi1LkY.png?scale-down-to=512&width=1024&height=1024",
        avatarAlt:
          "Industry leading non-custodial mobile wallet supporting 140+ interchain networks.",
      },
      {
        name: "Galaxy Station",
        summary: "",
        href: "https://station.hexxagon.io",
        avatar:
          "https://framerusercontent.com/images/NGuX2uS9QBeAb3jaiL0gLy1k.webp?width=240&height=240",
        avatarAlt: "Galaxy Station wallet for managing LUNC & USTC.",
      },
      {
        name: "Keplr",
        summary: "",
        href: "https://www.keplr.app",
        avatar:
          "https://framerusercontent.com/images/JtdxINIwGLGTV1qRWPSNwmeJuPY.png?width=512&height=512",
        avatarAlt: "Keplr multi-chain wallet with Terra Classic support.",
      },
      {
        name: "Ping.pub",
        summary: "",
        href: "https://ping.pub/terra-luna",
        avatar:
          "https://framerusercontent.com/images/C0qNl8sYo77sSqcOzXOp8QFAces.jpg?width=131&height=131",
        avatarAlt: "Ping.pub explorer & wallet for Cosmos and Terra Classic.",
      },
      {
        name: "Trust Wallet",
        summary: "",
        href: "https://trustwallet.com",
        avatar:
          "https://framerusercontent.com/images/A1p3T4ketxM0YRSFAW7Zx5Avg.webp?scale-down-to=512&width=866&height=650",
        avatarAlt: "Trust Wallet mobile app supporting LUNC and USTC.",
      },
      {
        name: "Vultisig",
        summary: "",
        href: "https://vultisig.com",
        avatar:
          "https://framerusercontent.com/images/dMGf7gSPRXMOhM4erWKpLvKdWk.jpeg?width=200&height=200",
        avatarAlt: "Vultisig multi-sig wallet tool for Terra Classic assets.",
      },
      {
        name: "Terra Station (Discontinued)",
        summary: "Discontinued wallet",
        avatar:
          "https://framerusercontent.com/images/s1Cl4ZcaP15Z4aozCkQIRe4oPo.png?scale-down-to=512&width=600&height=600",
        avatarAlt:
          "Terra Station official wallet for Terra Classic blockchain.",
        status: "DISCONTINUED",
      },
    ],
  },
  {
    id: "tools",
    title: "Blockchain tools",
    description:
      "Analytics, explorers, finders, DAO tools, and network utilities",
    icon: "gear",
    entries: [
      {
        name: "ATOMScan",
        summary: "Analytics",
        href: "https://atomscan.com/terra",
        avatar:
          "https://framerusercontent.com/images/96v29QVOvMihIF1zezP1Jer8o4.jpg?width=57&height=57",
        avatarAlt: "ATOMScan analytics explorer covering Terra Classic IBC.",
      },
      {
        name: "CW-20 Bakery",
        summary: "Burn tool",
        href: "https://Luncvers3.io/burn",
        avatar:
          "https://framerusercontent.com/images/VVTdcOTWxD8JJTgaUPV8POaqk.png?width=112&height=113",
        avatarAlt:
          "CW-20 Bakery app for burning Terra Classic layer-2 CW-20 tokens.",
      },
      {
        name: "Galaxy Finder",
        summary: "Finder",
        href: "https://finder.terraclassic.community",
        avatar:
          "https://framerusercontent.com/images/NGuX2uS9QBeAb3jaiL0gLy1k.webp?width=240&height=240",
        avatarAlt: "Galaxy Finder block explorer for Terra Classic network.",
      },
      {
        name: "DAO DAO",
        summary: "DAO tooling",
        href: "https://daodao.zone",
        avatar:
          "https://framerusercontent.com/images/xTt6HwdIQPzxuDqwRCsybgrZU.jpg?width=400&height=400",
        avatarAlt: "DAO DAO platform for Terra Classic DAO governance.",
      },
      {
        name: "LUNC Burner",
        summary: "Analytics",
        href: "https://lunc.tech",
        avatar:
          "https://framerusercontent.com/images/DuEi811MTJ1q69HdIiuPLx0IAIk.png?width=250&height=250",
        avatarAlt: "LUNC Burner analytics tracking daily LUNC burns.",
      },
      {
        name: "LUNCdash",
        summary: "Analytics",
        href: "https://luncdash.com",
        avatar:
          "https://framerusercontent.com/images/yARX8rWbcc6YTokStcaeE5hYolQ.jpeg?scale-down-to=512&width=1280&height=1243",
        avatarAlt: "LUNCdash analytics dashboard for Terra Classic metrics.",
      },
      {
        name: "LUNCdash Finder",
        summary: "Finder",
        href: "https://finder.luncdash.com",
        avatar:
          "https://framerusercontent.com/images/yARX8rWbcc6YTokStcaeE5hYolQ.jpeg?scale-down-to=512&width=1280&height=1243",
        avatarAlt: "LUNCdash Finder explorer for Terra Classic.",
      },
      {
        name: "LUNC Metrics",
        summary: "Analytics",
        href: "https://www.luncmetrics.com",
        avatar:
          "https://framerusercontent.com/images/zd5zcQOP0AfADulqmLCOkcUR8k.png?scale-down-to=512&width=1080&height=1080",
        avatarAlt: "LUNC Metrics site charting Terra Classic on-chain data.",
      },
      {
        name: "LuncScan",
        summary: "Analytics",
        href: "https://luncscan.com",
        avatar:
          "https://framerusercontent.com/images/ymCVRdodD20tcY4NWoosR1IqPyk.webp?width=54&height=53",
        avatarAlt: "LuncScan blockchain explorer for LUNC transactions.",
      },
      {
        name: "Lunc.Tools",
        summary: "Analytics",
        href: "https://lunc.tools",
        avatar:
          "https://framerusercontent.com/images/DFJXrumPsJao7EFOJBOGhw3j8TY.jpg?width=56&height=56",
        avatarAlt: "Lunc.Tools suite for Terra Classic stats & notifications.",
      },
      {
        name: "Ping.pub",
        summary: "Analytics",
        href: "https://ping.pub/terra-luna",
        avatar:
          "https://framerusercontent.com/images/C0qNl8sYo77sSqcOzXOp8QFAces.jpg?width=131&height=131",
        avatarAlt: "Ping.pub analytics tools for Cosmos & Terra Classic.",
      },
      {
        name: "StakeBin",
        summary: "Analytics",
        href: "https://terraclassic.stakebin.io/terra/supply",
        avatar:
          "https://framerusercontent.com/images/Oy3DKgvEd6pQBJiWfSHFKBYxZQ.png?width=48&height=48",
        avatarAlt: "StakeBin staking analytics for Luna Classic.",
      },
      {
        name: "Terra Finder",
        summary: "Finder",
        href: "https://finder.terra.money/classic",
        avatar:
          "https://framerusercontent.com/images/Nl3gGwjg357qGjkTSnr5dfWPZPM.png?scale-down-to=512&width=2500&height=2500",
        avatarAlt: "Terra Finder official explorer for Terra Classic.",
      },
      {
        name: "Terraport Finder",
        summary: "Finder",
        href: "https://finder.terraport.finance/",
        avatar:
          "https://framerusercontent.com/images/C1VRQ896uLUDqqphvN48jH6o0dM.png?width=64&height=64",
        avatarAlt:
          "Terraport Finder explorer for Terraport DEX on Terra Classic.",
      },
      {
        name: "TrackTerra",
        summary: "Explorer",
        href: "https://trackterra.org",
        avatar:
          "https://framerusercontent.com/images/V0cLYhbcLe7PgHo72pGsCz67jH8.png?width=225&height=225",
        avatarAlt: "TrackTerra portfolio & tax explorer for Terra Classic.",
      },
      {
        name: "Validator.info",
        summary: "Analytics",
        href: "https://validator.info/terra-classic",
        avatar:
          "https://framerusercontent.com/images/JD3k4cl1k43o9diiCCEjt6GifA.jpg?width=400&height=400",
        avatarAlt: "Validator.info analytics on Terra Classic validators.",
      },
    ],
  },
  {
    id: "bridges",
    title: "Bridges",
    description: "Cross-chain transfer and routing surfaces",
    icon: "bridge",
    entries: [
      {
        name: "Juris Bridge",
        summary: "",
        href: "https://dashboard.jurisprotocol.com/bridge",
        avatar:
          "https://framerusercontent.com/images/obdBBFwqR1y1ObX0POf8cyZ6Q.jpg?width=400&height=400",
        avatarAlt: "Juris Bridge connecting Terra Classic with BSC & Ethereum.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Terraport Bridge",
        summary: "",
        href: "https://terraport.finance/bridge",
        avatar:
          "https://framerusercontent.com/images/C1VRQ896uLUDqqphvN48jH6o0dM.png?width=64&height=64",
        avatarAlt: "Terraport Bridge moving assets into Terra Classic DEX.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Tritium Bridge",
        summary: "",
        href: "https://bridge.terratritium.com",
        avatar:
          "https://framerusercontent.com/images/yDCJLJ8OxA1IJpiqAclJuEfikhA.jpg?width=155&height=155",
        avatarAlt: "Tritium Bridge enabling Terra Classic asset transfers.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "skip:go",
        summary: "",
        href: "https://go.cosmos.network",
        avatar:
          "https://framerusercontent.com/images/ZPFDw8k4aQR3nXN8yTvEqB2USo.png?width=400&height=400",
        avatarAlt: "skip:go bridge for cross-chain LUNC transfers.",
      },
      {
        name: "Satellite",
        summary: "",
        href: "https://satellite.money/?destination_address=&asset_denom=uusdc&source=osmosis&destination=terra+classic",
        avatar:
          "https://framerusercontent.com/images/amSODyMQfj0cgmeO5YyHwfWaVIc.jpg?width=400&height=400",
        avatarAlt: "Satellite cross-chain bridge for Terra Classic tokens.",
      },
      {
        name: "TFM",
        summary: "",
        href: "https://app.tfm.com/ibc?chainFrom=&chainTo=",
        avatar:
          "https://framerusercontent.com/images/kjC10F5G0a3DUo5WcVNtjU6Ss.png?width=40&height=36",
        avatarAlt: "TFM cross-chain aggregator bridging LUNC liquidity.",
      },
    ],
  },
  {
    id: "validators",
    title: "Validators",
    description: "Validator directories and validator community channels",
    icon: "validator",
    entries: [
      {
        name: "StakeBin",
        summary: "",
        href: "https://terraclassic.stakebin.io/terra/validators",
        avatar:
          "https://framerusercontent.com/images/Oy3DKgvEd6pQBJiWfSHFKBYxZQ.png?width=48&height=48",
        avatarAlt: "StakeBin staking analytics for Luna Classic.",
      },
      {
        name: "Validator.Info",
        summary: "",
        href: "https://validator.info/terra-classic",
        avatar:
          "https://framerusercontent.com/images/JD3k4cl1k43o9diiCCEjt6GifA.jpg?width=400&height=400",
        avatarAlt: "Validator.info directory of Terra Classic validators.",
      },
      {
        name: "Validators Discord group",
        summary: "",
        href: "https://t.co/f8ZglfXyfr",
        avatar:
          "https://framerusercontent.com/images/6XmWldfnX1h3PbcD5GIPFvSI3iQ.png?width=225&height=225",
        avatarAlt: "Terra Classic Validators community Discord group.",
      },
      {
        name: "Validators Telegram group",
        summary: "",
        href: "https://t.me/transparentvalidatorchat",
        avatar:
          "https://framerusercontent.com/images/dFWzr8GDYXyyMfbMemer5eJIas.png?scale-down-to=512&width=2048&height=2048",
        avatarAlt: "Terra Classic Validators community Telegram group.",
      },
    ],
  },
  {
    id: "developers",
    title: "For developers",
    description:
      "Documentation, source code, endpoints, channels, and node snapshots",
    icon: "cube",
    entries: [
      {
        name: "Documentation",
        summary: "",
        href: "https://docs.terra-classic.io/",
        avatar:
          "https://framerusercontent.com/images/L5biu5JgSIXfXXLktcIooKTQH8.jpg?width=100&height=100",
        avatarAlt: "Terra Classic developer documentation (WIP).",
      },
      {
        name: "Github",
        summary: "",
        href: "https://github.com/classic-terra",
        avatar:
          "https://framerusercontent.com/images/D1r4qTT2vgWuEMRxgDH2jphYnkY.png?scale-down-to=512&width=2048&height=2048",
        avatarAlt: "Terra Classic source code repository on GitHub.",
      },
      {
        name: "Map of zones - Channels",
        summary: "",
        href: "https://mapofzones.com/zones/columbus-5/peers?columnKey=ibcVolumeIn&period=24h",
        avatar:
          "https://framerusercontent.com/images/OzOWYuO8GleJCOivigHSqezoSK4.png?width=280&height=280",
        avatarAlt: "Map of Zones chart of Terra Classic IBC channels.",
      },
      {
        name: "Endpoints - LCD - BiNodes",
        summary: "",
        href: "https://api-lunc-lcd.binodes.com/",
        avatar:
          "https://framerusercontent.com/images/6VEtRD7smOB4InXgSfHto1ZjSAM.png?width=64&height=64",
        avatarAlt: "Public LCD endpoint by BiNodes for Terra Classic.",
      },
      {
        name: "Endpoints - LCD - Hexxagon",
        summary: "",
        href: "https://lcd.terra-classic.hexxagon.io",
        avatar:
          "https://framerusercontent.com/images/6VEtRD7smOB4InXgSfHto1ZjSAM.png?width=64&height=64",
        avatarAlt: "Hexxagon LCD endpoint for Terra Classic developers.",
      },
      {
        name: "Endpoints - LCD - Public Node",
        summary: "",
        href: "https://terra-classic-lcd.publicnode.com/",
        avatar:
          "https://framerusercontent.com/images/6VEtRD7smOB4InXgSfHto1ZjSAM.png?width=64&height=64",
        avatarAlt: "Community LCD endpoint for Terra Classic.",
      },
      {
        name: "Endpoints - RPC - BiNodes",
        summary: "",
        href: "https://api-lunc-rpc.binodes.com/",
        avatar:
          "https://framerusercontent.com/images/6VEtRD7smOB4InXgSfHto1ZjSAM.png?width=64&height=64",
        avatarAlt: "BiNodes RPC endpoint for Terra Classic full nodes.",
      },
      {
        name: "Endpoints - RPC - Hexxagon",
        summary: "",
        href: "https://rpc.terra-classic.hexxagon.io",
        avatar:
          "https://framerusercontent.com/images/6VEtRD7smOB4InXgSfHto1ZjSAM.png?width=64&height=64",
        avatarAlt: "Hexxagon RPC endpoint for Terra Classic.",
      },
      {
        name: "Endpoints - RPC - Public Node",
        summary: "",
        href: "https://terra-classic-rpc.publicnode.com/",
        avatar:
          "https://framerusercontent.com/images/6VEtRD7smOB4InXgSfHto1ZjSAM.png?width=64&height=64",
        avatarAlt: "Public RPC endpoint for Terra Classic blockchain.",
      },
      {
        name: "Endpoints - FDC - Hexxagon",
        summary: "",
        href: "https://fcd.terra-classic.hexxagon.io",
        avatar:
          "https://framerusercontent.com/images/6VEtRD7smOB4InXgSfHto1ZjSAM.png?width=64&height=64",
        avatarAlt: "Hexxagon FDC endpoint streaming Terra Classic data.",
      },
      {
        name: "Endpoints - FDC - Public Node",
        summary: "",
        href: "https://terra-classic-fcd.publicnode.com/",
        avatar:
          "https://framerusercontent.com/images/6VEtRD7smOB4InXgSfHto1ZjSAM.png?width=64&height=64",
        avatarAlt: "Public FDC endpoint for Terra Classic.",
      },
      {
        name: "Endpoints - GRPC - Hexxagon",
        summary: "",
        href: "https://grpc.terra-classic.hexxagon.io",
        avatar:
          "https://framerusercontent.com/images/6VEtRD7smOB4InXgSfHto1ZjSAM.png?width=64&height=64",
        avatarAlt: "Hexxagon gRPC service for Terra Classic.",
      },
      {
        name: "Endpoints - HIVE - Hexxagon",
        summary: "",
        href: "https://hive.terra-classic.hexxagon.io",
        avatar:
          "https://framerusercontent.com/images/6VEtRD7smOB4InXgSfHto1ZjSAM.png?width=64&height=64",
        avatarAlt: "Hexxagon HIVE endpoint for Terra Classic archives.",
      },
      {
        name: "Endpoints - API - Hexxagon",
        summary: "",
        href: "https://api.terra-classic.hexxagon.io",
        avatar:
          "https://framerusercontent.com/images/6VEtRD7smOB4InXgSfHto1ZjSAM.png?width=64&height=64",
        avatarAlt: "Hexxagon API endpoint for Terra Classic data.",
      },
      {
        name: "Node snapshots - Hexxagon",
        summary: "",
        href: "https://snapshots.hexxagon.io/cosmos/terra-classic/columbus-5/",
        avatar:
          "https://framerusercontent.com/images/6VEtRD7smOB4InXgSfHto1ZjSAM.png?width=64&height=64",
        avatarAlt:
          "Latest node snapshots for running Terra Classic validators.",
      },
      {
        name: "Node snapshots - Public Node",
        summary: "",
        href: "https://www.publicnode.com/snapshots",
        avatar:
          "https://framerusercontent.com/images/6VEtRD7smOB4InXgSfHto1ZjSAM.png?width=64&height=64",
        avatarAlt:
          "Latest node snapshots for running Terra Classic validators.",
      },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure & service providers",
    description:
      "Node hosting, RPC APIs, validator infrastructure, and ecosystem services",
    icon: "server",
    entries: [
      {
        name: "Allnodes",
        summary: "Non-custodial node hosting",
        href: "https://www.allnodes.com",
        avatar:
          "https://framerusercontent.com/images/sfx9Q2raGQJp8EiNt0AHx4rkk.png?scale-down-to=512&width=1024&height=1024",
        avatarAlt:
          "Allnodes non-custodial node-hosting service for Terra Classic validators.",
      },
      {
        name: "CHALLENGE Studio",
        summary: "Web3 design & dev.",
        href: "https://challengestudio.pl/crypto",
        avatar:
          "https://framerusercontent.com/images/JVbyqn62c0HTysqJ1ftjkoW3hbc.png?width=44&height=44",
        avatarAlt:
          "CHALLENGE Studio is Branding and Product / UX / UI design studio working in Web3 market. Design & development partner for the Terra Classic ecosystem.",
      },
      {
        name: "Hexxagon",
        summary: "Validator hosting",
        href: "https://www.hexxagon.io",
        avatar:
          "https://framerusercontent.com/images/qm5Ff1NjC6IuTNLcNZhTpEZM.jpg?width=248&height=248",
        avatarAlt:
          "Hexxagon validator-hosting platform providing Terra Classic nodes.",
      },
      {
        name: "Nownodes",
        summary: "Blockchain RPC API",
        href: "https://nownodes.io",
        avatar:
          "https://framerusercontent.com/images/0YSwbLq4nIzOXuwgvyPNQoCYRfA.jpg?width=284&height=284",
        avatarAlt:
          "Nownodes blockchain RPC API delivering Terra Classic endpoints.",
      },
      {
        name: "Stakin.com",
        summary: "Dedicated nodes",
        href: "https://stakin.com",
        avatar:
          "https://framerusercontent.com/images/Qwrj7WLL8TgSWAn1os9KLHic6s.png?width=264&height=264",
        avatarAlt:
          "Stakin.com dedicated node service supporting Terra Classic validators.",
      },
    ],
  },
];

export const ecosystemEntryCount = ecosystemCategories.reduce(
  (total, category) => total + category.entries.length,
  0,
);
