import { developerInfrastructureEntries, networkInspectionEntries, validatorVisibilityEntries } from "./ecosystemVerification";
import type { EcosystemCategory } from "./ecosystemTypes";

export type { EcosystemCategory, EcosystemEntry } from "./ecosystemTypes";

export const ecosystemCategories: EcosystemCategory[] = [
  {
    id: "applications",
    title: "Applications",
    description:
      "Apps, DeFi products, launchpads, marketplaces, and aggregators",
    entries: [
      {
        name: "BigbangX",
        summary: "NFT marketplace",
        href: "https://bigbangx.io",
        avatar:
          "avatars/avatar-kbgylln8evukpwqywwkpk2vlxz8-2051758dcc.webp",
        avatarAlt: "BigbangX NFT marketplace for Terra Classic digital art.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Cookie.pay",
        summary: "Payments",
        href: "https://lunc.tools/cookie-pay",
        avatar:
          "avatars/avatar-59bhttuddueu8dwvdvtxcgpop4-df9579e717.webp",
        avatarAlt: "Cookie.pay crypto-payments gateway for LUNC and USTC.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Juris Protocol",
        summary: "Lending & borrowing",
        href: "https://jurisprotocol.com",
        avatar:
          "avatars/avatar-obdbbfwqr1y1obx0pof8cyz6q-e19587c5b9.webp",
        avatarAlt:
          "Juris Protocol lending & borrowing dApp (WIP) on Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "LbunProject",
        summary: "Orderbook",
        href: "https://orderbook.lbunproject.tech",
        avatar:
          "avatars/avatar-x4rnqowaej9nleuxfki8pxh1koc-01112e5725.webp",
        avatarAlt: "LbunProject on-chain order-book for Terra Classic tokens.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Miata",
        summary: "NFT marketplace",
        href: "https://miata.io",
        avatar:
          "avatars/avatar-pa9yyutqjyranwep7u3up5i24-370fb24a64.webp",
        avatarAlt: "Miata NFT marketplace for Terra Classic NFT collections.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "NFT.lunc.tools",
        summary: "NFT marketplace",
        href: "https://nft.lunc.tools",
        avatar:
          "avatars/avatar-6y6rbeqzw6noghmpfqc7kyotzny-27efc54854.webp",
        avatarAlt: "Truely decentralised NFTs on Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Orbit Wire",
        summary: "Aggregator",
        href: "https://orbitwire.io",
        avatar:
          "avatars/avatar-nd3lsshbcw0z9mspfilqd8r72ra-b0fed9c623.webp",
        avatarAlt:
          "Selenium synthetics platform (WIP) for Terra Classic assets.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Selenium",
        summary: "Synthetics platform",
        href: "https://selenium.finance",
        avatar:
          "avatars/avatar-ndxytekhjmayhczrkp8uvlpkmc-38343e0dc5.webp",
        avatarAlt:
          "Selenium synthetics platform (WIP) for Terra Classic assets.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Terra Casino",
        summary: "Leveraged trading",
        href: "https://terracasino.io/trading/BTC",
        avatar:
          "avatars/avatar-ykbwdvjvbvoafnzgtodstsjpc4-f140c36707.webp",
        avatarAlt:
          "Leveraged trading (BTC, ETH, BNB, XRP, TURBOWAVE) on Terra Casino",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Terraport Token Factory",
        summary: "Launchpad",
        href: "https://terraport.finance/development/token",
        avatar:
          "avatars/avatar-c1vrq896uludqqphvn48jh6o0dm-340ab8a75f.webp",
        avatarAlt:
          "Terraport Token Factory for launching Terra Classic tokens.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "TERRA.pump",
        summary: "Launchpad",
        href: "https://terrapump.fun",
        avatar:
          "avatars/avatar-mwa5tpkeg8mtkojpogz5if6zc0-b97990bf6d.webp",
        avatarAlt: "TERRA.pump launchpad accelerating Terra Classic startups.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "THEIA",
        summary: "Aggregator",
        href: "https://theia.trading",
        avatar:
          "avatars/avatar-hiafxnh8frcjok79nogruzlmu6g-f3bc93172d.webp",
        avatarAlt: "Theia price aggregator covering Terra Classic markets.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Vyntrex",
        summary: "Aggregator",
        href: "https://vyntrex.io",
        avatar:
          "avatars/avatar-mvz8vtpjufammzncupwh8cfds-2e958f26ca.webp",
        avatarAlt: "Vyntrex price aggregator covering Terra Classic markets.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Coinhall",
        summary: "Aggregator",
        href: "https://coinhall.org/terraclassic/terra1l7vy20x940je7lskm6x9s839vjsmekz9k9mv7g",
        avatar:
          "avatars/avatar-bs4kzygcm2k4har3dewmoqgaqhq-ff10291e4b.webp",
        avatarAlt: "Coinhall aggregator showing Terra Classic prices & charts.",
      },
      {
        name: "Sonic",
        summary: "Social / Messenger",
        href: "https://www.sonikchain.com",
        avatar:
          "avatars/avatar-8cvmlojpoj1enblm5okguhs7k-06a40a446f.webp",
        avatarAlt:
          "Sonic decentralized social/messenger dApp on Terra Classic.",
      },
    ],
  },
  {
    id: "entertainment",
    title: "Entertainment",
    description: "Games, metaverse, festivals, and culture projects",
    entries: [
      {
        name: "Air Force Lunc",
        summary: "Game",
        href: "https://www.bigbangx.io/air-force-lunc",
        avatar:
          "avatars/avatar-vmyfzmirtgvgomm88dzkp6relh8-b55eea5e88.webp",
        avatarAlt: "Air Force Lunc play-to-earn game on Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "BruteMove!",
        summary: "Game",
        href: "https://brutemove.net",
        avatar:
          "avatars/avatar-cpikmj5mb9pqxhjb1vdfwefrkc-0afbf28d88.webp",
        avatarAlt: "Galactic Shift WIP blockchain game for Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Galactic Shift",
        summary: "Game",
        href: "https://galacticshift.io",
        avatar:
          "avatars/avatar-k8ygb1djhqkbhpocl0zw19gfjwo-946b964430.webp",
        avatarAlt: "Galactic Shift WIP blockchain game for Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Garuda The Protector",
        summary: "Game",
        href: "https://play.google.com/store/apps/details?id=com.GarudaNodes.GarudaTheProtector3&pcampaignid=web_share",
        avatar:
          "avatars/avatar-y4ml5qrfwbzvv4fua1kyrv8vk9i-edd37cef82.webp",
        avatarAlt:
          "Garuda The Protector action game in the Terra Classic universe.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Legends of Terratria",
        summary: "Game",
        href: "https://aetherverge.io/games/lot",
        avatar:
          "avatars/avatar-ftnzyidzr6l8h6wqwjevuqshhi-6299b4f4d1.webp",
        avatarAlt:
          "Legends of Terratria role-playing game (WIP) on Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Lunc Zombie",
        summary: "Game",
        href: "https://play.google.com/store/apps/details?id=com.Unimasoft.Commando&pcampaignid=web_share",
        avatar:
          "avatars/avatar-b3geahil0zygq5t0srfksxcui0-469050835a.webp",
        avatarAlt: "Lunc Zombie shooter game earning LUNC rewards.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Luncverse",
        summary: "Metaverse",
        href: "https://luncverse.io",
        avatar:
          "avatars/avatar-nolgxhr8ymf5ynoypan5eysf8zk-4724576fc5.webp",
        avatarAlt: "Luncvers3 metaverse (WIP) built on Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "LUNC Tools World",
        summary: "Game",
        href: "https://world.lunc.tools",
        avatar:
          "avatars/avatar-wyrskewmqyfmlytlrhzeehc4ya-ac1c29cd07.webp",
        avatarAlt: "LUNC tools World game on Terra Classic",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "MIOFF",
        summary: "Festival",
        href: "https://mioff-token.com/",
        avatar:
          "avatars/avatar-wdju2me4i6tqfhfzjioq5oexy7y-b329ff4541.webp",
        avatarAlt: "MIOFF music & arts festival powered by Terra Classic NFTs.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "PENGS",
        summary: "Game",
        href: "https://x.com/pixel_pengs",
        avatar:
          "avatars/avatar-vniciuat2a8cloxqjd4hyf43do-23fe8c25dc.webp",
        avatarAlt: "PENGS casual game (WIP) using LUNC tokens.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "TRITIUM",
        summary: "Game",
        href: "https://play.terratritium.com",
        avatar:
          "avatars/avatar-ydcjlj8oxa1ijpiqacljuefikha-7f1bd6a462.webp",
        avatarAlt: "TRITIUM arcade game rewarding Luna Classic players.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Terra Casino",
        summary: "Casino and live poker",
        href: "https://terracasino.io",
        avatar:
          "avatars/avatar-ykbwdvjvbvoafnzgtodstsjpc4-f140c36707.webp",
        avatarAlt: "Terra Casino online casino accepting LUNC & USTC.",
      },
    ],
  },
  {
    id: "information",
    title: "Blockchain information",
    description: "Forums, news, safety references, and ecosystem information",
    entries: [
      {
        name: "Agora",
        summary: "Official forum",
        href: "https://agora.terra-classic.money",
        avatar:
          "avatars/avatar-p9cokr28aq4ro8cxf2w9btipyu-e333865bdb.webp",
        avatarAlt: "Discourse - Unofficial discussion forum for Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "LuncDaily",
        summary: "News website",
        href: "https://luncdaily.com",
        avatar:
          "avatars/avatar-zyotb6sg4sp7dum8hmnjqyop5qe-c1a8f6b6dd.webp",
        avatarAlt: "LuncDaily news site covering Terra Classic updates.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "LUNC Burner",
        summary: "News website",
        href: "https://lunc.tech",
        avatar:
          "avatars/avatar-duei811mtj1q69hdiiuplx0iaik-c1abab7363.webp",
        avatarAlt: "LUNC Burner portal tracking Terra Classic token burns.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "LuncToken.org",
        summary: "News website",
        href: "https://www.lunctoken.org",
        avatar:
          "avatars/avatar-kkxwpkhmsp3njmrnypyyjtfu20-21010b42e0.webp",
        avatarAlt: "LuncToken.org news and analytics for LUNC.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Terraclassic.network",
        summary: "News website",
        href: "https://terraclassic.network",
        avatar:
          "avatars/avatar-6reeimx9dgsgeljen6pspmfks20-e58e07fa9c.webp",
        avatarAlt: "Terraclassic.network community news for Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "CertiK Audit",
        summary: "",
        href: "https://skynet.certik.com/projects/terra",
        avatar:
          "avatars/avatar-qe6nqocyqmdityqdronoje6xqs8-d2a683bc49.webp",
        avatarAlt: "CertiK security audit report for Terra Classic projects.",
      },
      {
        name: "Common.xyz",
        summary: "Unofficial forum",
        href: "https://forum.terra-classic.money",
        avatar:
          "avatars/avatar-0xgvfdwsbvzyonipenkflnyckye-eacab42e47.webp",
        avatarAlt: "Common.xyz official discussion forum for Terra Classic.",
      },
    ],
  },
  {
    id: "wallets",
    title: "Wallets",
    description: "Wallets and account tools for Terra Classic users",
    entries: [
      {
        name: "LUNCdash",
        summary: "",
        href: "https://luncdash.com",
        avatar:
          "avatars/avatar-yarx8rwbcc6ytokstcaee5hyolq-b7c09a28d8.webp",
        avatarAlt: "LUNCdash dashboard & wallet for Terra Classic.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Orbitar",
        summary: "",
        href: "https://orbitar.app",
        avatar:
          "avatars/avatar-rxhx36kfk9smidd5vu4ax6ia1gm-e2d6f9d292.webp",
        avatarAlt: "Orbitar Mobile: Your Crypto Universe, Securely in Orbit!",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Cosmostation Mobile",
        summary: "",
        href: "https://www.cosmostation.io/products/cosmostation_mobile",
        avatar:
          "avatars/avatar-sj0bdgv3ppffvioxrezlxhi1lky-d5970777c7.webp",
        avatarAlt:
          "Industry leading non-custodial mobile wallet supporting 140+ interchain networks.",
      },
      {
        name: "Galaxy Station",
        summary: "",
        href: "https://station.hexxagon.io",
        avatar:
          "avatars/avatar-ngux2us9qbeab3jail0gly1k-87fdca0f53.webp",
        avatarAlt: "Galaxy Station wallet for managing LUNC & USTC.",
      },
      {
        name: "Keplr",
        summary: "",
        href: "https://www.keplr.app",
        avatar:
          "avatars/avatar-jtdxiniwglgtv1qrwpsnwmejupy-aa3bf9cf0f.webp",
        avatarAlt: "Keplr multi-chain wallet with Terra Classic support.",
      },
      {
        name: "Ping.pub",
        summary: "",
        href: "https://ping.pub/terra-luna",
        avatar:
          "avatars/avatar-c0qnl8syo77ssqcozxop8qfaces-3e281e8e96.webp",
        avatarAlt: "Ping.pub explorer & wallet for Cosmos and Terra Classic.",
      },
      {
        name: "Trust Wallet",
        summary: "",
        href: "https://trustwallet.com",
        avatar:
          "avatars/avatar-a1p3t4ketxm0yrsfaw7zx5avg-f50afe67ee.webp",
        avatarAlt: "Trust Wallet mobile app supporting LUNC and USTC.",
      },
      {
        name: "Vultisig",
        summary: "",
        href: "https://vultisig.com",
        avatar:
          "avatars/avatar-dmgf7gsprxmohm4erwkplvkdwk-50ef9930ca.webp",
        avatarAlt: "Vultisig multi-sig wallet tool for Terra Classic assets.",
      },
      {
        name: "Terra Station (Discontinued)",
        summary: "Discontinued wallet",
        avatar:
          "avatars/avatar-s1cl4zcap15z4aozckqire4opo-fb2ab21eb9.webp",
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
    entries: [
      ...networkInspectionEntries,
      {
        name: "LuncScan",
        summary: "Analytics",
        href: "https://luncscan.com",
        avatar:
          "avatars/avatar-ymcvrdodd20tcy4nwoosr1iqpyk-fbb2313815.webp",
        avatarAlt: "LuncScan blockchain explorer for LUNC transactions.",
      },
      {
        name: "Lunc.Tools",
        summary: "Analytics",
        href: "https://lunc.tools",
        avatar:
          "avatars/avatar-dfjxrumpsjao7efojboghw3j8ty-a5f97cda77.webp",
        avatarAlt: "Lunc.Tools suite for Terra Classic stats & notifications.",
      },
      {
        name: "Ping.pub",
        summary: "Analytics",
        href: "https://ping.pub/terra-luna",
        avatar:
          "avatars/avatar-c0qnl8syo77ssqcozxop8qfaces-3e281e8e96.webp",
        avatarAlt: "Ping.pub analytics tools for Cosmos & Terra Classic.",
      },
      {
        name: "StakeBin",
        summary: "Analytics",
        href: "https://terraclassic.stakebin.io/terra/supply",
        avatar:
          "avatars/avatar-oy3dkgved6pqbjiwfshfkbyxzq-f68c8b5517.webp",
        avatarAlt: "StakeBin staking analytics for Luna Classic.",
      },
      {
        name: "Terra Finder",
        summary: "Finder",
        href: "https://finder.terra.money/classic",
        avatar:
          "avatars/avatar-nl3ggwjg357qgjktsnr5dfwpzpm-5c0279b502.webp",
        avatarAlt: "Terra Finder official explorer for Terra Classic.",
      },
      {
        name: "Terraport Finder",
        summary: "Finder",
        href: "https://finder.terraport.finance/",
        avatar:
          "avatars/avatar-c1vrq896uludqqphvn48jh6o0dm-340ab8a75f.webp",
        avatarAlt:
          "Terraport Finder explorer for Terraport DEX on Terra Classic.",
      },
      {
        name: "TrackTerra",
        summary: "Explorer",
        href: "https://trackterra.org",
        avatar:
          "avatars/avatar-v0clyhbcle7pgho72pgscz67jh8-f929c753a5.webp",
        avatarAlt: "TrackTerra portfolio & tax explorer for Terra Classic.",
      },
      {
        name: "Validator.info",
        summary: "Analytics",
        href: "https://validator.info/terra-classic",
        avatar:
          "avatars/avatar-jd3k4cl1k43o9diiccejt6gifa-b70790a293.webp",
        avatarAlt: "Validator.info analytics on Terra Classic validators.",
      },
    ],
  },
  {
    id: "bridges",
    title: "Bridges",
    description: "Cross-chain transfer and routing surfaces",
    entries: [
      {
        name: "Juris Bridge",
        summary: "",
        href: "https://dashboard.jurisprotocol.com/bridge",
        avatar:
          "avatars/avatar-obdbbfwqr1y1obx0pof8cyz6q-e19587c5b9.webp",
        avatarAlt: "Juris Bridge connecting Terra Classic with BSC & Ethereum.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Terraport Bridge",
        summary: "",
        href: "https://terraport.finance/bridge",
        avatar:
          "avatars/avatar-c1vrq896uludqqphvn48jh6o0dm-340ab8a75f.webp",
        avatarAlt: "Terraport Bridge moving assets into Terra Classic DEX.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "Tritium Bridge",
        summary: "",
        href: "https://bridge.terratritium.com",
        avatar:
          "avatars/avatar-ydcjlj8oxa1ijpiqacljuefikha-7f1bd6a462.webp",
        avatarAlt: "Tritium Bridge enabling Terra Classic asset transfers.",
        badge: "ON-CHAIN NATIVE",
      },
      {
        name: "skip:go",
        summary: "",
        href: "https://go.cosmos.network",
        avatar:
          "avatars/avatar-zpfdw8k4aqr3nxn8ytveqb2uso-48b651c4ee.webp",
        avatarAlt: "skip:go bridge for cross-chain LUNC transfers.",
      },
      {
        name: "Satellite",
        summary: "",
        href: "https://satellite.money/?destination_address=&asset_denom=uusdc&source=osmosis&destination=terra+classic",
        avatar:
          "avatars/avatar-amsodymqfj0cgmeo5yyhwfwavic-1a263ea669.webp",
        avatarAlt: "Satellite cross-chain bridge for Terra Classic tokens.",
      },
      {
        name: "TFM",
        summary: "",
        href: "https://app.tfm.com/ibc?chainFrom=&chainTo=",
        avatar:
          "avatars/avatar-kjc10f5g0a3duo5wcvntju6ss-d3f3671cee.webp",
        avatarAlt: "TFM cross-chain aggregator bridging LUNC liquidity.",
      },
    ],
  },
  {
    id: "validators",
    title: "Validators",
    description: "Validator directories and validator community channels",
    entries: validatorVisibilityEntries,
  },
  {
    id: "developers",
    title: "For developers",
    description:
      "Documentation, source code, endpoints, channels, and node snapshots",
    entries: [
      ...developerInfrastructureEntries,
      {
        name: "Endpoints - RPC - Public Node",
        summary: "",
        href: "https://terra-classic-rpc.publicnode.com/",
        avatar:
          "avatars/avatar-6vetrd7smob4inxgsfhto1zjsam-5bada12239.webp",
        avatarAlt: "Public RPC endpoint for Terra Classic blockchain.",
      },
      {
        name: "Endpoints - FDC - Hexxagon",
        summary: "",
        href: "https://fcd.terra-classic.hexxagon.io",
        avatar:
          "avatars/avatar-6vetrd7smob4inxgsfhto1zjsam-5bada12239.webp",
        avatarAlt: "Hexxagon FDC endpoint streaming Terra Classic data.",
      },
      {
        name: "Endpoints - FDC - Public Node",
        summary: "",
        href: "https://terra-classic-fcd.publicnode.com/",
        avatar:
          "avatars/avatar-6vetrd7smob4inxgsfhto1zjsam-5bada12239.webp",
        avatarAlt: "Public FDC endpoint for Terra Classic.",
      },
      {
        name: "Endpoints - GRPC - Hexxagon",
        summary: "",
        href: "https://grpc.terra-classic.hexxagon.io",
        avatar:
          "avatars/avatar-6vetrd7smob4inxgsfhto1zjsam-5bada12239.webp",
        avatarAlt: "Hexxagon gRPC service for Terra Classic.",
      },
      {
        name: "Endpoints - HIVE - Hexxagon",
        summary: "",
        href: "https://hive.terra-classic.hexxagon.io",
        avatar:
          "avatars/avatar-6vetrd7smob4inxgsfhto1zjsam-5bada12239.webp",
        avatarAlt: "Hexxagon HIVE endpoint for Terra Classic archives.",
      },
      {
        name: "Endpoints - API - Hexxagon",
        summary: "",
        href: "https://api.terra-classic.hexxagon.io",
        avatar:
          "avatars/avatar-6vetrd7smob4inxgsfhto1zjsam-5bada12239.webp",
        avatarAlt: "Hexxagon API endpoint for Terra Classic data.",
      },
      {
        name: "Node snapshots - Hexxagon",
        summary: "",
        href: "https://snapshots.hexxagon.io/cosmos/terra-classic/columbus-5/",
        avatar:
          "avatars/avatar-6vetrd7smob4inxgsfhto1zjsam-5bada12239.webp",
        avatarAlt:
          "Latest node snapshots for running Terra Classic validators.",
      },
      {
        name: "Node snapshots - Public Node",
        summary: "",
        href: "https://www.publicnode.com/snapshots",
        avatar:
          "avatars/avatar-6vetrd7smob4inxgsfhto1zjsam-5bada12239.webp",
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
    entries: [
      {
        name: "Allnodes",
        summary: "Non-custodial node hosting",
        href: "https://www.allnodes.com",
        avatar:
          "avatars/avatar-sfx9q2ragqjp8eint0ahx4rkk-413826f64d.webp",
        avatarAlt:
          "Allnodes non-custodial node-hosting service for Terra Classic validators.",
      },
      {
        name: "CHALLENGE Studio",
        summary: "Web3 design & dev.",
        href: "https://challengestudio.pl/crypto",
        avatar:
          "avatars/avatar-jvbyqn62c0htysqj1ftjkow3hbc-4168cdd28f.webp",
        avatarAlt:
          "CHALLENGE Studio is Branding and Product / UX / UI design studio working in Web3 market. Design & development partner for the Terra Classic ecosystem.",
      },
      {
        name: "Hexxagon",
        summary: "Validator hosting",
        href: "https://www.hexxagon.io",
        avatar:
          "avatars/avatar-qm5ff1njc6iutnlcnzhtpezm-0e558954ea.webp",
        avatarAlt:
          "Hexxagon validator-hosting platform providing Terra Classic nodes.",
      },
      {
        name: "Nownodes",
        summary: "Blockchain RPC API",
        href: "https://nownodes.io",
        avatar:
          "avatars/avatar-0yswblq4nizoxuwgvypnqocyrfa-c719c1eb0d.webp",
        avatarAlt:
          "Nownodes blockchain RPC API delivering Terra Classic endpoints.",
      },
      {
        name: "Stakin.com",
        summary: "Dedicated nodes",
        href: "https://stakin.com",
        avatar:
          "avatars/avatar-qwrj7wll8tgswan1os9klhic6s-f4d76f7613.webp",
        avatarAlt:
          "Stakin.com dedicated node service supporting Terra Classic validators.",
      },
    ],
  },
];
