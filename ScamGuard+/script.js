// State Management
let currentLang = 'en';
let selectedImageBase64 = null;

const views = ['home', 'checker', 'victim', 'settings'];

// Load state from storage
async function loadState() {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        const data = await chrome.storage.local.get(['sg_lang']);
        currentLang = data.sg_lang || 'en';
    } else {
        currentLang = localStorage.getItem('sg_lang') || 'en';
    }
}

const i18n = {
    en: {
        tap_to_speak: "Tap to Speak Incident",
        listening: "Listening...",
        victim_name: "Your Name",
        victim_number: "Your Mobile Number",
        name_ph: "Enter your full name",
        number_ph: "e.g. 9876543210",
        app_name: "ScamGuard+",
        app_status: "AI Protection Active",
        app_version: "ScamGuard+ Mobile v1.2",
        home_title: "Secure Your Financial Future.",
        home_subtitle: "Advanced identity protection and scam prevention powered by Gemini AI.",
        nav_checker: "Scam Checker",
        nav_checker_desc: "Verify suspicious emails, texts, or images with elite AI.",
        nav_victim: "Victim Support",
        nav_victim_desc: "Deceived or lost money? Get immediate help & official police reports.",
        checker_title: "Scam Detector",
        checker_instr: "Paste text or upload a screenshot for visual AI scanning.",
        checker_placeholder: "e.g. 'You have won a lottery of $1M...'",
        upload_text: "Scan Screenshot",
        btn_analyze: "Analyze with Gemini AI",
        btn_analyzing: "Scanning...",
        btn_translate: "EN",
        victim_title: "Emergency Recovery",
        victim_q1: "How were you defrauded?",
        victim_q2: "When did it happen?",
        victim_q3: "Amount Lost (Approximate)",
        victim_q4: "Suspect's Contact/Account Detail",
        victim_q5: "Briefly describe how it happened",
        victim_btn: "Generate Full Complaint & Plan",
        victim_alert: "Time is of the essence. Act quickly!",
        victim_reset: "Start Another Incident",
        q1_v1: "UPI / Instant Transfer",
        q1_v2: "Credit / Debit Card",
        q1_v3: "Direct Bank Transfer",
        q1_v4: "Cryptocurrency",
        q1_v5: "Gift Cards / Vouchers",
        q2_v1: "Less than 30 mins ago (Golden Hour)",
        q2_v2: "Sometime today",
        q2_v3: "More than 24 hours ago",
        q3_ph: "e.g. ₹25,000 or $500",
        q4_ph: "Phone number, UPI ID, or Website link",
        q5_ph: "e.g. Received a call about KYC update, shared OTP...",
        settings_title: "Settings",
        api_label: "Gemini AI Key",
        api_hint: "Your key is stored locally for AI analysis.",
        save_btn: "Save Settings",
        rec_title1: "Freeze Account",
        rec_desc1: "Call your bank immediately to block all transactions.",
        rec_title2: "Cyber Crime Portal",
        rec_desc2: "Report on cybercrime.gov.in or call 1930.",
        fir_to: "To, Officer-in-Charge, Cyber Cell.",
        fir_sub: "Subject: Formal Complaint regarding fraud of",
        fir_desc: "Description of Incident:",
        fir_sus: "Suspect Details:",
        copy_btn: "Copy Full Draft",
        copied: "Copied to clipboard!",
        notif_settings: "Settings updated successfully!",
        notif_translated: "Translated to English",
        notif_trans_failed: "Translation failed",
        notif_reading: "Reading Screen Content...",
        api_hint_local: "Gemini AI (Local Edition) Active. No API Key required."
    },
    hi: {
        tap_to_speak: "घटना बताने के लिए टैप करें",
        listening: "सुन रहा है...",
        victim_name: "आपका नाम",
        victim_number: "आपका मोबाइल नंबर",
        name_ph: "अपना पूरा नाम दर्ज करें",
        number_ph: "उदा. 9876543210",
        app_name: "स्कैम गार्ड+",
        app_status: "एआई सुरक्षा सक्रिय",
        app_version: "स्कैमগার্ড+ मोबाइल v1.2",
        home_title: "अपने भविष्य को सुरक्षित करें।",
        home_subtitle: "जेमिनी एआई द्वारा संचालित उन्नत पहचान सुरक्षा और स्कैम रोकथाम।",
        nav_checker: "स्कैम चेकर",
        nav_checker_desc: "संदिग्ध ईमेल, संदेश या छवियों की जांच करें।",
        nav_victim: "पीड़ित सहायता",
        nav_victim_desc: "धोखा हुआ या पैसे खो गए? तत्काल सहायता और रिपोर्ट प्राप्त करें।",
        checker_title: "स्कैम डिटेक्टर",
        checker_instr: "विजुअल एआई स्कैनिंग के लिए टेक्स्ट पेस्ट करें या स्क्रीनशॉट अपलोड करें।",
        checker_placeholder: "उदा. 'आपने १ मिलियन डॉलर की लॉटरी जीती है!'",
        upload_text: "स्क्रीनशॉट स्कैन करें",
        btn_analyze: "जेमिनी एआई के साथ जांचें",
        btn_analyzing: "स्कैन हो रहा है...",
        btn_translate: "हिंदी",
        victim_title: "आपातकालीन रिकवरी",
        victim_q1: "आपके साथ कैसे धोखाधड़ी हुई?",
        victim_q2: "यह कब हुआ?",
        victim_q3: "खोई हुई राशि (लगभग)",
        victim_q4: "संदिग्ध का संपर्क/खाता विवरण",
        victim_q5: "संक्षेप में बताएं कि यह कैसे हुआ",
        victim_btn: "पूरी शिकायत और योजना बनाएं",
        victim_alert: "समय की कमी है। जल्दी कार्रवाई करें!",
        victim_reset: "एक और घटना शुरू करें",
        q1_v1: "यूपीआई / तत्काल स्थानांतरण",
        q1_v2: "क्रेडिट / डेबिट कार्ड",
        q1_v3: "सीधा बैंक ट्रांसफर",
        q1_v4: "क्रिप्टोकरेंसी",
        q1_v5: "गिफ्ट कार्ड / वाउचर",
        q2_v1: "३० मिनट से कम समय पहले (गोल्डन आवर)",
        q2_v2: "आज कभी",
        q2_v3: "२४ घंटे से अधिक समय पहले",
        q3_ph: "उदा. ₹२५,००० या $५००",
        q4_ph: "फोन नंबर, यूपीआई आईडी, या वेबसाइट लिंक",
        q5_ph: "उदा. केवाईसी अपडेट के बारे में कॉल आया, ओटीपी साझा किया...",
        settings_title: "सेटिंग्स",
        api_label: "जेमिनी एआई एपीआई की",
        api_hint: "आपकी की एआई विश्लेषण के लिए स्थानीय रूप से संग्रहीत है।",
        save_btn: "सेटिंग्स सहेजें",
        rec_title1: "खाता फ्रीज करें",
        rec_desc1: "सभी लेनदेन रोकने के लिए तुरंत अपने बैंक को कॉल करें।",
        rec_title2: "साइबर क्राइम पोर्टल",
        rec_desc2: "cybercrime.gov.in पर रिपोर्ट करें या १९३० पर कॉल करें।",
        fir_to: "सेवा में, प्रभारी अधिकारी, साइबर सेल।",
        fir_sub: "विषय: धोखाधड़ी के संबंध में औपचारिक शिकायत - राशि:",
        fir_desc: "घटना का विवरण:",
        fir_sus: "संदिग्ध का विवरण:",
        copy_btn: "पूरा ड्राफ्ट कॉपी करें",
        copied: "क्लिपबोर्ड पर कॉपी किया गया!",
        notif_settings: "सेटिंग्स सफलतापूर्वक अपडेट की गईं!",
        notif_translated: "अंग्रेजी में अनुवादित",
        notif_trans_failed: "अनुवाद विफल रहा",
        notif_reading: "स्क्रीन सामग्री पढ़ी जा रही है...",
        api_hint_local: "जेमिनी एआई (स्थानीय संस्करण) सक्रिय। किसी एपीआई कुंजी की आवश्यकता नहीं है।"
    },
    bn: {
        tap_to_speak: "ঘটনা বলতে ট্যাপ করুন",
        listening: "শুনছি...",
        victim_name: "আপনার নাম",
        victim_number: "আপনার মোবাইল নম্বর",
        name_ph: "আপনার পুরো নাম লিখুন",
        number_ph: "যেমন 9876543210",
        app_name: "স্ক্যামগার্ড+",
        app_status: "এআই সুরক্ষা সক্রিয়",
        app_version: "স্ক্যামগার্ড+ মোবাইল v1.2",
        home_title: "আপনার আর্থিক ভবিষ্যৎ নিরাপদ করুন।",
        home_subtitle: "জেমিনি এআই দ্বারা চালিত উন্নত পরিচয় সুরক্ষা এবং কেলেঙ্কারি প্রতিরোধ।",
        nav_checker: "স্ক্যাম চেকার",
        nav_checker_desc: "এলিট এআই দিয়ে সন্দেহজনক ইমেল, টেক্সট বা ছবি যাচাই করুন।",
        nav_victim: "ভুক্তভোগী সহায়তা",
        nav_victim_desc: "প্রতারিত হয়েছেন বা টাকা হারিয়েছেন? তৎক্ষণাৎ সাহায্য এবং রিপোর্ট পান।",
        checker_title: "স্ক্যাম ডিটেক্টর",
        checker_instr: "ভিজ্যুয়াল এআই স্ক্যানিংয়ের জন্য টেক্সট পেস্ট করুন বা স্ক্রিনশট আপলোড করুন।",
        checker_placeholder: "যেমন 'অভিনন্দন! আপনি ১ মিলিয়ন ডলার জিতেছেন...'",
        upload_text: "স্ক্রিনশট স্ক্যান করুন",
        btn_analyze: "জেমিনি এআই দিয়ে বিশ্লেষণ করুন",
        btn_analyzing: "স্ক্যান করা হচ্ছে...",
        btn_translate: "বাংলা",
        victim_title: "জরুরী রিকভারি",
        victim_q1: "আপনার সাথে কীভাবে প্রতারণা করা হয়েছে?",
        victim_q2: "এটি কখন ঘটেছে?",
        victim_q3: "হারানো পরিমাণ (আনুমানিক)",
        victim_q4: "সন্দেহভাজন ব্যক্তির বিবরণ",
        victim_q5: "কীভাবে এটি ঘটেছে তা সংক্ষেপে বর্ণনা করুন",
        victim_btn: "সম্পূর্ণ অভিযোগ এবং পরিকল্পনা তৈরি করুন",
        victim_alert: "সময় খুব মূল্যবান। দ্রুত ব্যবস্থা নিন!",
        victim_reset: "অন্য একটি ঘটনা শুরু করুন",
        q1_v1: "UPI / তাত্ক্ষণিক স্থানান্তর",
        q1_v2: "ক্রেডিট / ডেবিট কার্ড",
        q1_v3: "সরাসরি ব্যাংক ট্রান্সফার",
        q1_v4: "ক্রিপ্টোকারেন্সি",
        q1_v5: "গিফট কার্ড / ভাউচার",
        q2_v1: "৩০ মিনিটেরও কম আগে (গোল্ডেন আওয়ার)",
        q2_v2: "আজ কখনো",
        q2_v3: "২৪ ঘণ্টারও বেশি আগে",
        q3_ph: "যেমন ₹২৫,০০০ বা $৫০০",
        q4_ph: "ফোন নম্বর, UPI আইডি বা ওয়েবসাইটের লিঙ্ক",
        q5_ph: "যেমন KYC আপডেটের কল পেয়েছি, OTP শেয়ার করেছি...",
        settings_title: "সেটিংস",
        api_label: "জেমিনি এআই এপিআই কী",
        api_hint: "আপনার কী স্থানীয়ভাবে সংরক্ষিত আছে।",
        save_btn: "সেটিংস সেভ করুন",
        rec_title1: "অ্যাকাউন্ট ফ্রিজ করুন",
        rec_desc1: "তৎক্ষণাৎ আপনার ব্যাংকে ফোন করে লেনদেন বন্ধ করুন।",
        rec_title2: "সাইবার ক্রাইম পোর্টাল",
        rec_desc2: "cybercrime.gov.in-এ রিপোর্ট করুন বা ১৯৩০-এ কল করুন।",
        fir_to: "প্রতি, অফিসার-ইন-চার্জ, সাইবার সেল।",
        fir_sub: "বিষয়: আর্থিক প্রতারণা সংক্রান্ত আনুষ্ঠানিক অভিযোগ - পরিমাণ:",
        fir_desc: "ঘটনার বর্ণনা:",
        fir_sus: "সন্দেহভাজন ব্যক্তির বিবরণ:",
        copy_btn: "সম্পূর্ণ ড্রাফ্ট কপি করুন",
        copied: "ক্লিপবোর্ডে কপি করা হয়েছে!",
        notif_settings: "সেটিংস সফলভাবে আপডেট করা হয়েছে!",
        notif_translated: "ইংরেজিতে অনূদিত",
        notif_trans_failed: "অনুবাদ ব্যর্থ হয়েছে",
        notif_reading: "স্ক্রিনের বিষয়বস্তু পড়া হচ্ছে...",
        api_hint_local: "জেמיני এআই (স্থানীয় সংস্করণ) সক্রিয়। কোন এপিআই কী-এর প্রয়োজন নেই।"
    },
    te: {
        tap_to_speak: "సంఘటన చెప్పడానికి నొక్కండి",
        listening: "వింటున్నాను...",
        victim_name: "మీ పేరు",
        victim_number: "మీ మొబైల్ నంబర్",
        name_ph: "మీ పూర్తి పేరు నమోదు చేయండి",
        number_ph: "ఉదా. 9876543210",
        app_name: "స్కామ్‌గార్డ్+",
        app_status: "ఏఐ రక్షణ సక్రియంగా ఉంది",
        app_version: "స్కామ్‌గార్డ్+ మొబైల్ v1.2",
        home_title: "మీ ఆర్థిక భవిష్యత్తును సురక్షితం చేసుకోండి.",
        home_subtitle: "జెమిని ఏఐ ద్వారా ఆధారితమైన అధునాతన గుర్తింపు రక్షణ మరియు స్కామ్ నివారణ.",
        nav_checker: "స్కామ్ చెకర్",
        nav_checker_desc: "అనుమానాస్పద ఇమెయిల్స్, టెక్స్ట్‌లు లేదా చిత్రాలను ఏఐ తో తనిఖీ చేయండి.",
        nav_victim: "బాధితుల సహాయం",
        nav_victim_desc: "మోసపోయారా లేదా డబ్బు కోల్పోయారా? తక్షణ సహాయం మరియు రిపోర్టులు పొందండి.",
        checker_title: "స్కామ్ డిటెక్టర్",
        checker_instr: "ఏఐ స్కానింగ్ కోసం టెక్స్ట్‌ను పేస్ట్ చేయండి లేదా స్క్రీన్‌షాట్‌ను అప్‌లోడ్ చేయండి.",
        checker_placeholder: "ఉదా: 'మీరు లాటరీ గెలుచుకున్నారు...' ",
        upload_text: "స్క్రీన్‌షాట్ స్కాన్ చేయండి",
        btn_analyze: "జెమిని ఏఐ తో విశ్లేషించండి",
        btn_analyzing: "స్కాన్ చేస్తోంది...",
        btn_translate: "తెలుగు",
        victim_title: "అత్యవసర రికవరీ",
        victim_q1: "మీరు ఎలా మోసపోయారు?",
        victim_q2: "ఇది ఎప్పుడు జరిగింది?",
        victim_q3: "కోల్పోయిన మొత్తం (సుమారుగా)",
        victim_q4: "అనుమానితుడి వివరాలు",
        victim_q5: "ఏమి జరిగిందో సంక్షిప్తంగా వివరించండి",
        victim_btn: "పూర్తి ఫిర్యాదు మరియు ప్రణాళికను రూపొందించండి",
        victim_alert: "సమయం చాలా కీలకం. త్వరగా స్పందించండి!",
        victim_reset: "మరొక సంఘటనను ప్రారంభించండి",
        q1_v1: "UPI / తక్షణ బదిలీ",
        q1_v2: "క్రెడిట్ / డెబిట్ కార్డ్",
        q1_v3: "డైరెక్ట్ బ్యాంక్ బదిలీ",
        q1_v4: "క్రిప్టోకరెన్సీ",
        q1_v5: "గిఫ్ట్ కార్డ్‌లు / వోచర్లు",
        q2_v1: "30 నిమిషాల క్రితం కంటే తక్కువ (గోల్డెన్ అవర్)",
        q2_v2: "ఈరోజు ఎప్పుడైనా",
        q2_v3: "24 గంటల క్రితం కంటే ఎక్కువ",
        q3_ph: "ఉదా. ₹25,000 లేదా $500",
        q4_ph: "ఫోన్ నంబర్, UPI ID లేదా వెబ్‌సైట్ లింక్",
        q5_ph: "ఉదా. KYC అప్‌డేట్ గురించి కాల్ వచ్చింది, OTP షేర్ చేసాను...",
        settings_title: "సెట్టింగ్‌లు",
        api_label: "జెమిని ఏఐ ఏపీఐ కీ",
        api_hint: "మీ కీ లోకల్ గా సేవ్ చేయబడింది.",
        save_btn: "సెట్టింగ్‌లను సేవ్ చేయండి",
        rec_title1: "ఖాతాను ఫ్రీజ్ చేయండి",
        rec_desc1: "వెంటనే మీ బ్యాంకుకు కాల్ చేసి లావాదేవీలను నిలిపివేయండి.",
        rec_title2: "సైబర్ క్రైమ్ పోర్టల్",
        rec_desc2: "cybercrime.gov.in లో ఫిర్యాదు చేయండి లేదా ౧౯౩౦ కి కాల్ చేయండి.",
        fir_to: "గౌరవనీయులైన ఆఫీసర్-ఇన్-చార్జ్, సైబర్ సెల్.",
        fir_sub: "విషయం: ఆర్థిక మోసం గురించి ఫిర్యాదు - మొత్తం:",
        fir_desc: "సంఘటన వివరాలు:",
        fir_sus: "అనుమానితుడి వివరాలు:",
        copy_btn: "పూర్తి డ్రాఫ్ట్‌ను కాపీ చేయండి",
        copied: "క్లిప్‌బోర్డ్‌కు కాపీ చేయబడింది!",
        notif_settings: "సెట్టింగ్‌లు విజయవంతంగా అప్‌డేట్ చేయబడ్డాయి!",
        notif_translated: "ఇంగ్లీషులోకి అనువదించబడింది",
        notif_trans_failed: "అనువాదం విఫలమైంది",
        notif_reading: "స్క్రీన్ కంటెంట్ చదవబడుతోంది...",
        api_hint_local: "జెమిని ఏఐ (లోకల్ ఎడిషన్) సక్రియంగా ఉంది. ఏపీఐ కీ అవసరం లేదు."
    },
    ta: {
        tap_to_speak: "சம்பவத்தைப் பேச தட்டவும்",
        listening: "கேட்கிறது...",
        victim_name: "உங்கள் பெயர்",
        victim_number: "உங்கள் மொபைல் எண்",
        name_ph: "உங்கள் முழு பெயரை உள்ளிடவும்",
        number_ph: "எ.கா. 9876543210",
        app_name: "ஸ்கேம்கார்டு+",
        app_status: "ஏஐ பாதுகாப்பு செயலில் உள்ளது",
        app_version: "ஸ்கேம்கார்டு+ மொபைல் v1.2",
        home_title: "உங்கள் நிதி எதிர்காலத்தைப் பாதுகாக்கவும்.",
        home_subtitle: "ஜெமினி ஏஐ மூலம் இயங்கும் மேம்பட்ட அடையாள பாதுகாப்பு மற்றும் ஸ்கேம் தடுப்பு.",
        nav_checker: "ஸ்கேம் செக்கர்",
        nav_checker_desc: "சந்தேகத்திற்குரிய மின்னஞ்சல்கள், உரைகள் அல்லது படங்களை ஏஐ மூலம் சரிபார்க்கவும்.",
        nav_victim: "பாதிப்பு ஆதரவு",
        nav_victim_desc: "ஏமாற்றப்பட்டதா அல்லது பணம் இழந்ததா? உடனடி உதவி மற்றும் புகார்களைப் பெறுங்கள்.",
        checker_title: "ஸ்கேம் டிடெக்டர்",
        checker_instr: "உரை அல்லது ஸ்கிரீன்ஷாட்டைப் பதிவேற்றி ஏஐ மூலம் ஸ்கேன் செய்யவும்.",
        checker_placeholder: "எ.கா. 'நீங்கள் ௧ மில்லியன் டாலர் லாட்டரி வென்றுள்ளீர்கள்!'",
        upload_text: "ஸ்கிரீன்ஷாட்டை ஸ்கேன் செய்",
        btn_analyze: "ஜெமினி ஏஐ மூலம் பகுப்பாய்வு செய்",
        btn_analyzing: "ஸ்கேன் செய்கிறது...",
        btn_translate: "தமிழ்",
        victim_title: "அவசர மீட்பு",
        victim_q1: "நீங்கள் எப்படி ஏமாற்றப்பட்டீர்கள்?",
        victim_q2: "இது எப்போது நடந்தது?",
        victim_q3: "இழந்த தொகை (தோராயமாக)",
        victim_q4: "சந்தேகத்திற்குரிய நபரின் விவரங்கள்",
        victim_q5: "அது எப்படி நடந்தது என்று சுருக்கமாக விவரிக்கவும்",
        victim_btn: "முழு புகாரையும் திட்டத்தையும் உருவாக்கு",
        victim_alert: "நேரம் மிக முக்கியமானது. விரைவாக செயல்படுங்கள்!",
        victim_reset: "மற்றொரு சம்பவத்தைத் தொடங்குங்கள்",
        q1_v1: "UPI / உடனடி பரிமாற்றம்",
        q1_v2: "கிரெடிட் / டெபிட் கார்டு",
        q1_v3: "நேரடி வங்கி பரிமாற்றம்",
        q1_v4: "கிரிப்டோகரன்சி",
        q1_v5: "பரிசு அட்டைகள் / வவுச்சர்கள்",
        q2_v1: "30 நிமிடங்களுக்குள் (கோல்டன் ஹவர்)",
        q2_v2: "இன்று எப்போதாவது",
        q2_v3: "24 மணி நேரத்திற்கு முன்பு",
        q3_ph: "எ.கா. ₹25,000 அல்லது $500",
        q4_ph: "தொலைபேசி எண், UPI ஐடி அல்லது இணையதள இணைப்பு",
        q5_ph: "எ.கா. KYC புதுப்பிப்பு பற்றி அழைப்பு வந்தது, OTP பகிரப்பட்டது...",
        settings_title: "அமைப்புகள்",
        api_label: "ஜெமினி ஏஐ ஏபிஐ சாவி",
        api_hint: "உங்கள் சாவி உள்ளூரில் சேமிக்கப்பட்டுள்ளது.",
        save_btn: "அமைப்புகளைச் சேமி",
        rec_title1: "கணக்கை முடக்கு",
        rec_desc1: "பரிவர்த்தனைகளை நிறுத்த உடனே வங்கியை அழைக்கவும்.",
        rec_title2: "சைபர் கிரைம் போர்டல்",
        rec_desc2: "cybercrime.gov.in இல் புகார் செய்யவும் அல்லது ௧௯௩௦ ஐ அழைக்கவும்.",
        fir_to: "பெறுநர், அதிகாரி, சைபர் பிரிவு.",
        fir_sub: "பொருள்: நிதி மோசடி தொடர்பான புகார் - தொகை:",
        fir_desc: "சம்பவத்தின் விவரம்:",
        fir_sus: "சந்தேகத்திற்குரிய நபரின் விவரம்:",
        copy_btn: "முழு நகலையும் சேமி",
        copied: "நகலெடுக்கப்பட்டது!",
        notif_settings: "அமைப்புகள் வெற்றிகரமாக புதுப்பிக்கப்பட்டன!",
        notif_translated: "ஆங்கிலத்தில் மொழிபெயர்க்கப்பட்டது",
        notif_trans_failed: "மொழிபெயர்ப்பு தோல்வியடைந்தது",
        notif_reading: "திரை உள்ளடக்கம் படிக்கப்படுகிறது...",
        api_hint_local: "ஜெமினி ஏஐ (உள்ளூர் பதிப்பு) செயலில் உள்ளது. ஏபிஐ சாவி தேவையில்லை."
    }
};

// UI Elements with constructor check
const elements = {
    views: views.reduce((acc, v) => ({ ...acc, [v]: document.getElementById(`view-${v}`) }), {}),
    lang: document.getElementById('lang-selector'),
    inputs: {
        checker: document.getElementById('checker-input'),
        apiKey: document.getElementById('input-api-key'),
        image: document.getElementById('image-input')
    },
    buttons: {
        navChecker: document.getElementById('nav-checker'),
        navVictim: document.getElementById('nav-victim'),
        settings: document.getElementById('btn-settings'),
        back: document.querySelectorAll('.back-btn'),
        analyze: document.getElementById('btn-analyze'),
        victimNext: document.getElementById('btn-victim-next'),
        victimReset: document.getElementById('btn-victim-reset'),
        saveSettings: document.getElementById('btn-save-settings'),
        removeImg: document.getElementById('btn-remove-img'),
        speakGlobal: document.getElementById('btn-speak-global'),
        installPwa: document.getElementById('btn-install-pwa'),
        refreshApp: document.getElementById('btn-refresh-app')
    },
    display: {
        result: document.getElementById('checker-result'),
        reportHub: document.getElementById('report-hub'),
        dropZone: document.getElementById('image-drop-zone'),
        preview: document.getElementById('image-preview'),
        previewCont: document.getElementById('upload-preview-container'),
        uploadIdle: document.getElementById('upload-idle')
    }
};

// INITIALIZE LANG SELECTOR
if (elements.lang) {
    elements.lang.value = currentLang;
    elements.lang.onchange = updateLanguage;
}

async function updateLanguage() {
    const lang = elements.lang.value;
    currentLang = lang;

    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        await chrome.storage.local.set({ 'sg_lang': lang });
    } else {
        localStorage.setItem('sg_lang', lang);
    }

    // Update Text Content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[lang][key]) el.innerText = i18n[lang][key];
    });

    // Update Placeholder Content
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (i18n[lang][key]) el.placeholder = i18n[lang][key];
    });
}

// THE ULTIMATE "ZERO-SILENCE" SPEECH ENGINE
let speechQueue = [];
let isSpeaking = false;
let currentUtterance = null;
let speechTimer = null;

function stopSpeech() {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    speechQueue = [];
    if (speechTimer) clearInterval(speechTimer);
    document.querySelectorAll('.speaker-btn, #btn-speak-global').forEach(btn => btn.classList.remove('playing'));
}

function speak(text, triggerBtn = null) {
    if (!text) return;

    // If already speaking and same button clicked, stop it
    if (isSpeaking && triggerBtn && triggerBtn.classList.contains('playing')) {
        stopSpeech();
        return;
    }

    stopSpeech();
    isSpeaking = true;
    if (triggerBtn) triggerBtn.classList.add('playing');

    // 1. Clean up HTML and symbols
    const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\n/g, '. ').replace(/\s+/g, ' ').trim();

    // 2. Split into chunks (sentences or max 200 chars to avoid browser limits)
    // Adding Indic punctuation support (। - Danda)
    const chunks = cleanText.match(/[^.!?।]+[.!?।]*|.{1,200}(?=\s|$)|.{1,200}/g) || [cleanText];
    speechQueue = chunks.map(c => c.trim()).filter(c => c.length > 0);

    const langCodes = { 'hi': 'hi-IN', 'bn': 'bn-IN', 'te': 'te-IN', 'ta': 'ta-IN', 'en': 'en-US' };
    const targetLang = langCodes[currentLang] || 'en-US';

    const processQueue = () => {
        if (!isSpeaking || speechQueue.length === 0) {
            stopSpeech();
            return;
        }

        const msg = speechQueue.shift();
        const utterance = new SpeechSynthesisUtterance(msg);
        currentUtterance = utterance;

        // Voice Engine Logic - Enhanced for Indic Languages
        const voices = window.speechSynthesis.getVoices();
        const voiceMap = {
            'hi': ['hindi', 'hi-in'],
            'bn': ['bengali', 'bangla', 'bn-in'],
            'te': ['telugu', 'te-in'],
            'ta': ['tamil', 'ta-in'],
            'en': ['english', 'en-us']
        };
        const searchTerms = voiceMap[currentLang] || ['en-us'];

        let voice = voices.find(v => v.lang.toLowerCase().replace('_', '-') === targetLang.toLowerCase()) ||
            voices.find(v => searchTerms.some(term => v.name.toLowerCase().includes(term)));

        if (voice) {
            utterance.voice = voice;
            utterance.lang = voice.lang;
        } else {
            utterance.lang = targetLang;
        }

        utterance.rate = 1.0;
        utterance.pitch = 1;

        utterance.onend = () => {
            if (isSpeaking) setTimeout(processQueue, 50);
        };

        utterance.onerror = (e) => {
            console.error('Speech Error:', e);
            if (isSpeaking) processQueue();
        };

        // Fix for Chrome 15s bug & Ensure persistence
        if (speechTimer) clearInterval(speechTimer);
        speechTimer = setInterval(() => {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.pause();
                window.speechSynthesis.resume();
            }
        }, 12000);

        window.speechSynthesis.speak(utterance);
    };

    const runEngine = () => {
        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = () => {
                if (isSpeaking && window.speechSynthesis.getVoices().length > 0) {
                    window.speechSynthesis.onvoiceschanged = null;
                    processQueue();
                }
            };
        } else {
            processQueue();
        }
    };

    runEngine();
}

// Global Read Aloud
if (elements.buttons.speakGlobal) {
    elements.buttons.speakGlobal.onclick = (e) => {
        const activeView = document.querySelector('.view.active');
        if (!activeView) return;

        // Collect all meaningful text from the active view
        const elementsToRead = activeView.querySelectorAll('h1, h2, h3, h4, p, label, .verdict-tag, .result-summary, .report-item h4, .report-item p, .complaint-box');
        const textToRead = Array.from(elementsToRead)
            .filter(el => {
                const style = window.getComputedStyle(el);
                return style.display !== 'none' && style.visibility !== 'hidden' && el.offsetParent !== null;
            })
            .map(el => el.innerText)
            .join('. ');

        if (textToRead.trim()) {
            speak(textToRead, elements.buttons.speakGlobal);
            showNotification(i18n[currentLang].notif_reading);
        }
    };
}

// Translation Logic removed as it requires API

// Standard Image Handling
if (elements.display.dropZone) elements.display.dropZone.onclick = () => elements.inputs.image.click();
if (elements.inputs.image) {
    elements.inputs.image.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                selectedImageBase64 = event.target.result.split(',')[1];
                elements.display.preview.src = event.target.result;
                elements.display.previewCont.classList.remove('hidden');
                elements.display.uploadIdle.classList.add('hidden');
            };
            reader.readAsDataURL(file);
        }
    };
}
if (elements.buttons.removeImg) {
    elements.buttons.removeImg.onclick = (e) => {
        e.stopPropagation();
        selectedImageBase64 = null;
        elements.inputs.image.value = '';
        elements.display.previewCont.classList.add('hidden');
        elements.display.uploadIdle.classList.remove('hidden');
    };
}

// Navigation
function switchView(target) {
    stopSpeech();
    Object.values(elements.views).forEach(v => v.classList.remove('active'));
    elements.views[target].classList.add('active');
    document.querySelector('.app-wrapper').scrollTop = 0;
}

if (elements.buttons.navChecker) elements.buttons.navChecker.onclick = () => switchView('checker');
if (elements.buttons.navVictim) elements.buttons.navVictim.onclick = () => switchView('victim');
if (elements.buttons.settings) elements.buttons.settings.onclick = () => switchView('settings');
if (elements.buttons.back) elements.buttons.back.forEach(b => b.onclick = () => switchView('home'));

// Settings
if (elements.buttons.saveSettings) {
    elements.buttons.saveSettings.onclick = async () => {
        showNotification(i18n[currentLang].notif_settings);
        switchView('home');
    };
}

// Refresh App Logic
if (elements.buttons.refreshApp) {
    elements.buttons.refreshApp.onclick = () => {
        // Clear cache if needed or just reload
        window.location.reload();
    };
}

function showNotification(msg) {
    const div = document.createElement('div');
    div.style = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: rgba(15, 23, 42, 0.8);
        backdrop-filter: blur(12px);
        color: white;
        padding: 12px 24px;
        border-radius: 100px;
        font-size: 0.85rem;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        border: 1px solid rgba(255,255,255,0.1);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
        pointer-events: none;
    `;
    div.innerText = msg;
    document.body.appendChild(div);

    // Animate in
    requestAnimationFrame(() => {
        div.style.opacity = "1";
        div.style.transform = "translateX(-50%) translateY(0)";
    });

    setTimeout(() => {
        div.style.opacity = "0";
        div.style.transform = "translateX(-50%) translateY(10px)";
        setTimeout(() => div.remove(), 400);
    }, 3000);
}

// Gemini Scam Analysis
if (elements.buttons.analyze) {
    elements.buttons.analyze.onclick = async () => {
        const text = elements.inputs.checker.value.trim();
        if (!text && !selectedImageBase64) return;

        const btn = elements.buttons.analyze;
        const btnText = btn.querySelector('[data-i18n="btn_analyze"]') || document.getElementById('btn-text');
        const loader = btn.querySelector('.loader') || document.getElementById('btn-loader');

        // UI State: Loading
        btn.disabled = true;
        if (btnText) btnText.classList.add('hidden');
        if (loader) loader.classList.remove('hidden');

        try {
            // STEP 1: Notification Listener (Simulated Trigger via UI)
            // In a real extension, this would come from chrome.notifications
            const source = "Manual Check";

            // STEP 2 & 3: Pre-Crime Reasoning & Risk Mapping
            // We use the new NotificationGuardian to process this
            const analysis = await NotificationGuardian.process(text, source);

            // The Guardian already updates the UI via showResult() internally with the correct data structure.
            // Removing the redundant and incorrect manual mapping here which was causing specific fields to be undefined.

        } catch (e) {
            console.error('Analysis Error:', e);
            showResult({ riskScore: 50, riskLevel: "Engine Error", summary: "The Pre-Crime engine encountered a glitch.", indicators: [] });
        } finally {
            btn.disabled = false;
            if (btnText) btnText.classList.remove('hidden');
            if (loader) loader.classList.add('hidden');
            if (loader) loader.classList.add('hidden');
        }
    };
}

// ---------------------------------------------------------
// LIVE MONITOR SIMULATION (Background Trigger)
// ---------------------------------------------------------
const toggleProtection = document.getElementById('toggle-protection');
if (toggleProtection) {
    toggleProtection.onchange = (e) => {
        const simControls = document.getElementById('simulation-controls');
        if (e.target.checked) {
            showNotification("Live Monitor Active. Scanning background notifications...");
            // Reveal Simulation Controls
            if (simControls) {
                simControls.classList.remove('hidden');
                simControls.style.display = 'flex';
            }
        } else {
            showNotification("Live Monitor Disabled.");
            // Hide Simulation Controls
            if (simControls) {
                simControls.classList.add('hidden');
                simControls.style.display = 'none';
            }
        }
    };
}

const BackgroundSimulator = {
    simulateIncoming: async (text) => {
        // 1. Show a toast looking like a system notification
        const notifDiv = document.createElement('div');
        notifDiv.style = `
            position: fixed; top: 20px; right: 20px; width: 300px;
            background: #1e293b; border-left: 4px solid #6366f1;
            padding: 15px; border-radius: 8px; color: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 20000;
            font-family: sans-serif; opacity: 0; transform: translateX(50px);
            transition: all 0.5s ease;
        `;
        notifDiv.innerHTML = `
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                <div style="background:#25D366; width:20px; height:20px; border-radius:50%; display:flex; justify-content:center; align-items:center;">
                    <svg viewBox="0 0 24 24" fill="white" width="12" height="12"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2z"/></svg>
                </div>
                <span style="font-size:0.75rem; color:#fff; font-weight:bold; letter-spacing: 0.5px;">WhatsApp Business • Now</span>
            </div>
            <div style="font-size:0.95rem; color: #f1f5f9; line-height: 1.4;">${text}</div>`;
        document.body.appendChild(notifDiv);

        // Play Notification Sound
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed', e));

        // Slide In
        requestAnimationFrame(() => {
            notifDiv.style.opacity = "1";
            notifDiv.style.transform = "translateX(0)";
        });

        // 2. Trigger Guardian immediately
        await NotificationGuardian.process(text, "Simulated Background Event");

        // Remove toast later
        setTimeout(() => {
            notifDiv.style.opacity = "0";
            setTimeout(() => notifDiv.remove(), 500);
        }, 8000);
    }
};

// ---------------------------------------------------------
// PRE-CRIME NOTIFICATION ENGINE (User Requested Feature)
// ---------------------------------------------------------

const PreCrimeReasoning = {
    /**
     * Simulates the Gemini Pre-Crime Reasoning Call
     * Returns structured JSON as requested.
     */
    analyze: async (text, source) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const lowerText = (text || "").toLowerCase();
                let score = 0;
                let tactics = [];
                let explanation = "";
                let predictedAction = "ignore";
                let urgency = "low";

                // 1. Detection Logic (Heuristic Simulation of Gemini)
                const patterns = {
                    // High Risk
                    apk_virus: /\.apk|download (this )?app|install (this )?application|new version available|update (your )?pan|kyc update app/i,
                    fake_confirm: /payment successful|received for your plan|transaction id|success: ₹|recharge successful/i,
                    scam_link: /jio-support-refund\.live|bit\.ly|tinyurl|ngrok|kseb-bill|electricity-board|drive\.google\.com\/file/i,
                    any_link: /https?:\/\/[^\s]+|www\.[^\s]+/i,
                    urgency: /immediately|urgent|within 24 hours|today|block|suspend|expire/i,
                    authority: /police|cyber cell|rbi|bank manager|customs|income tax/i,
                    reward: /lottery|winner|prize|iphone|funds released|beneficiary/i,
                    otp: /otp|pin|password|cvv/i
                };

                // Baseline Score Calculation
                if (patterns.apk_virus.test(lowerText) && patterns.any_link.test(lowerText)) {
                    score = 100;
                    tactics.push("malicious_apk_download");
                    explanation = "CRITICAL: This is a Banking Trojan/Virus. Installing this .apk will drain your bank account.";
                }
                else if (patterns.scam_link.test(lowerText)) { score += 100; tactics.push("malicious_domain"); }
                else if (patterns.any_link.test(lowerText)) { score += 40; }

                if (patterns.urgency.test(lowerText)) { score += 30; tactics.push("forced_urgency"); }
                if (patterns.authority.test(lowerText)) { score += 20; tactics.push("authority_impersonation"); }

                // Specific Check for the user's APK request
                if (score >= 99 && tactics.includes("malicious_apk_download")) {
                    urgency = "critical";
                    // Special override for APKs as requested
                    predictedAction = "install_malware";
                }

                // Fake Transaction Logic (Special Case)
                if (patterns.fake_confirm.test(lowerText)) {
                    // Check if it has a sketchy link
                    if (patterns.any_link.test(lowerText)) {
                        const trusted = ["jio.com", "amazon.in", "flipkart.com", "gpay", "phonepe", "paytm"];
                        const isTrusted = trusted.some(t => lowerText.includes(t) && !lowerText.includes("-refund"));
                        if (!isTrusted) {
                            score = 95;
                            tactics.push("fake_transaction_receipt");
                        }
                    } else {
                        // Plain text confirmation might be real?
                        // If no link, usually safe.
                        if (score < 50) score = 0; // Reset if no other flags
                    }
                }

                score = Math.min(score, 100);

                // 2. Predict User Action
                if (predictedAction !== "install_malware") {
                    if (patterns.any_link.test(lowerText)) predictedAction = "click_link";
                    else if (patterns.otp.test(lowerText)) predictedAction = "share_otp";
                    else if (lowerText.includes("call")) predictedAction = "call_number";
                    else predictedAction = "ignore";
                }

                // 3. Determine Urgency & Explanation
                if (score > 80) urgency = "high";
                else if (score > 50) urgency = "medium";

                if (!explanation) {
                    if (score > 80) explanation = "High danger: Message contains known scam patterns and malicious links.";
                    else if (score > 40) explanation = "Caution: Message uses psychological tactics to pressure you.";
                    else explanation = "Safe: No suspicious patterns detected.";
                }

                // 4. Construct JSON Response
                let warningText = "";
                if (score > 80) {
                    if (tactics.includes("malicious_apk_download")) {
                        // Specific Warning for APKs
                        warningText = "Critical Warning! It is a scam message. Do not open it. Do not install the file. | यह एक स्कैम है। इसे न खोलें। फाइल इनस्टॉल न करें। | এটি একটি স্ক্যাম। এটি খুলবেন না। ফাইলটি ইনস্টল করবেন না।";
                    } else {
                        // Standard Warning
                        warningText = "Warning! Scam detected. Do not click the link. | सावधान! यह एक स्कैम है। लिंक पर क्लिक न करें। (Savdhaan! Yeh ek scam hai.) | সাবধান! এটি একটি স্ক্যাম। লিঙ্কে ক্লিক করবেন না।";
                    }
                }

                const response = {
                    risk_score: score,
                    scam_type: score > 80 ? "Phishing / Fraud" : "Spam / Unknown",
                    manipulation_tactics: tactics,
                    predicted_user_action: predictedAction,
                    urgency_level: urgency,
                    // Voice alert logic is computed in Next Step, but populated here as per schema requirement
                    voice_alert_required: score > 80,
                    voice_alert_text: warningText,
                    explanation_short: explanation
                };

                resolve(response);
            }, 800);
        });
    }
};

const NotificationGuardian = {
    /**
     * STEP 3: Risk → Action Mapping (Deterministic Logic)
     */
    process: async (text, source) => {
        // Step 2: Call the NEW "5-Border" & "APK-Killer" Engine
        const analysis = await analyzeLocally(text);
        const risk = analysis.risk_score || analysis.riskScore; // Handle both key formats

        console.log("🛡️ Guardian Analysis:", analysis);

        // AUTO-UPDATE UI: This ensures the user sees the result without clicking/pasting
        showResult(analysis);

        // Step 3: Threshold Actions
        if (risk < 60) {
            console.log("Action: Safe");
        } else if (risk >= 80) {
            // Voice Alert for High Risk
            const alertText = risk === 100 ?
                "Critical Alert! Malicious APK file detected. Do not install this application." :
                "Warning! Scam detected. This message contains suspicious links or requests.";

            NotificationGuardian.triggerVoiceAlert(alertText, risk === 100);
        }

        return analysis;
    },

    /**
     * STEP 4: Voice Alert Generator (Multilingual)
     */
    triggerVoiceAlert: (text, persistent) => {
        if (!text) return;

        // Split text by pipe `|` to get [English, Hindi, Bengali] segments
        const segments = text.split('|').map(s => s.trim());
        let currentIndex = 0;

        function speakNextSegment() {
            if (currentIndex >= segments.length) {
                if (persistent) {
                    persistent = false; // Prevent infinite loop, just repeat once cycle
                    currentIndex = 0;
                    setTimeout(speakNextSegment, 2000);
                }
                return;
            }

            const segmentText = segments[currentIndex];
            const utterance = new SpeechSynthesisUtterance(segmentText);
            utterance.rate = 0.9;
            utterance.pitch = 1.0; // Clearer pitch
            utterance.volume = 1.0;

            // Simple language detection based on segment index or content char code
            // 0: English, 1: Hindi, 2: Bengali
            if (currentIndex === 0) utterance.lang = 'en-US';
            else if (currentIndex === 1) utterance.lang = 'hi-IN';
            else if (currentIndex === 2) utterance.lang = 'bn-IN';

            // Fallback for voices
            const voices = window.speechSynthesis.getVoices();
            const voice = voices.find(v => v.lang === utterance.lang) || voices.find(v => v.lang.includes(utterance.lang.split('-')[0]));
            if (voice) utterance.voice = voice;

            utterance.onend = () => {
                currentIndex++;
                speakNextSegment();
            };

            window.speechSynthesis.speak(utterance);
        }

        window.speechSynthesis.cancel();
        speakNextSegment();
    }
};

async function analyzeLocally(text) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const lowerText = (text || "").toLowerCase();

            // ZERO TRUST POLICY: Start with High Risk
            // "Every message should be a scam until and unless it passes the 5 borders."
            let riskScore = 85;
            let riskLevel = "SCAM DETECTED";
            let indicators = [];

            // THE 5 BORDERS (Strict Safety Checks)
            // If ANY of these are found, the message FAILS and remains a SCAM.
            const borders = {
                hasLink: /https?:\/\/[^\s]+|www\.[^\s]+|\.com\/|\.in\/|\.net\/|\.org\/|bit\.ly|tinyurl|t\.me/i.test(lowerText),
                hasUrgency: /urgent|immediate|soon|expire|limited|last chance|hurry|block|suspend|तुरंत|অবিলম্বে|తక్షణమే|உடனடியாக/i.test(lowerText),
                hasPrize: /won|winner|lottery|prize|gift|reward|congratulations|जीत|লটারি|గెలిచారు|வெற்றி/i.test(lowerText),
                hasSensitive: /bank|account|upi|card|cvv|otp|password|pin|verify|update|kyc|pan|खाతా|అకౌంట్|கணக்கு|অ্যাকাউন্ট/i.test(lowerText),
                hasAction: /click|call|dial|share|download|install|apk|file|support|refund|क्लिக்கு|क्लिक|கிளிக்|ক্লিক/i.test(lowerText),
                hasAPK: /\.apk|apk\sfile|download\sapk|install\sapk/i.test(lowerText)
            };

            // CRITICAL MALWARE CHECK: APK Detected?
            if (borders.hasAPK) {
                riskScore = 100;
                riskLevel = "CRITICAL MALWARE ALERT";
                indicators.push("FATAL: Malicious .APK file detected. Do NOT install!");
            }

            // STRICT EVALUATION
            if (borders.hasLink) indicators.push("Border 1 Failed: Contains external link");
            if (borders.hasUrgency) indicators.push("Border 2 Failed: Urgency/Threat detected");
            if (borders.hasPrize) indicators.push("Border 3 Failed: Unreal prize/lottery promise");
            if (borders.hasSensitive) indicators.push("Border 4 Failed: Requests sensitive info/banking");
            if (borders.hasAction) indicators.push("Border 5 Failed: Suspicious call-to-action found");

            // CHECK: Did it pass ALL 5 borders?
            const passedAllBorders = !borders.hasLink && !borders.hasUrgency && !borders.hasPrize && !borders.hasSensitive && !borders.hasAction;

            if (passedAllBorders) {
                // If it passes all checks, it's SAFE.
                riskScore = 0;
                riskLevel = "SAFE MESSAGE";
                indicators = ["Passed all 5 Safety Borders (No links, urgency, or threats)"];
            } else {
                // If it failed ANY check, it remains a SCAM.
                // We can boost the score for multiple violations
                let violations = 0;
                if (borders.hasLink) violations++;
                if (borders.hasUrgency) violations++;
                if (borders.hasPrize) violations++;
                if (borders.hasSensitive) violations++;
                if (borders.hasAction) violations++;

                if (violations >= 2) riskScore = 95; // Very High Risk

                // Keep default 85 for single violation
            }

            // EXCEPTION: Allowlisted Trusted Transaction (Must have NO Malicious Link)
            // E.g. "Payment Successful. Trans ID: 12345" -> This hits "Sensitive" (payment/id) so it fails.
            // But we want to allow legit bank texts.
            // RULE: If it looks like a transaction AND has strict Trusted Domain or NO Link, we forgive "Sensitive" flag.
            const isTransaction = /payment successful|received|debited|credited|transaction|acct|stmt/i.test(lowerText);
            const trustedDomains = ["jio.com", "amazon.in", "flipkart.com", "myjio", "paytm", "gpay", "phonepe", "hdfc", "sbi", "icici"];
            const hasTrustedLinkOnly = trustedDomains.some(d => lowerText.includes(d)) && !/refund|support|help|care/i.test(lowerText);

            if (isTransaction) {
                if (!borders.hasLink && !borders.hasUrgency && !borders.hasPrize && !borders.hasAction) {
                    // It has "Sensitive" words (like 'acct'), but no other red flags. Safe.
                    riskScore = 0;
                    riskLevel = "SAFE MESSAGE";
                    indicators = ["Verified as Safe Transaction Receipt (No suspicious links/urgency)"];
                }
                else if (borders.hasLink && hasTrustedLinkOnly && !borders.hasUrgency) {
                    // It has a link, but it's ONLY a trusted domain (e.g. jio.com) and no urgency. Safe.
                    riskScore = 0;
                    riskLevel = "SAFE MESSAGE";
                    indicators = ["Verified source (Trusted Domain Compliance)"];
                }
            }

            // Visual AI Simulation (Always High Risk if image present)
            if (selectedImageBase64) {
                riskScore = Math.max(riskScore, 85);
                riskLevel = "SCAM DETECTED (Visual)";
                indicators.push("Visual AI detected deceptive UI patterns");
            }

            // Summary Generation
            const summaries = {
                en: riskScore === 0 ? "Verified Safe: Passed all 5 security checks. No suspicious patterns found." : "SCAM ALERT: This message failed one or more safety checks (Link, Urgency, or Sensitive Request). Do not interact.",
                hi: riskScore === 0 ? "सुरक्षित सत्यापित: सभी 5 सुरक्षा जाँच पास की गईं। कोई संदिग्ध पैटर्न नहीं मिला।" : "स्कैम अलर्ट: यह संदेश सुरक्षा जाँच में विफल रहा (लिंक, अत्यावश्यकता, या संवेदनशील अनुरोध)। बातचीत न करें।",
                bn: riskScore === 0 ? "যাচাইকৃত নিরাপদ: সমস্ত ৫টি নিরাপত্তা পরীক্ষা পাস করেছে। কোনো সন্দেহজনক প্যাটার্ন পাওয়া যায়নি।" : "স্ক্যাম সতর্কতা: এই বার্তাটি এক বা একাধিক নিরাপত্তা পরীক্ষায় ব্যর্থ হয়েছে (লিঙ্ক, জরুরিতা, বা সংবেদনশীল অনুরোধ)। যোগাযোগ করবেন না।",
                te: riskScore === 0 ? "సురక్షితమని నిర్ధారించబడింది: అన్ని 5 భద్రతా తనిఖీలను పాస్ చేసింది." : "స్కామ్ హెచ్చరిక: ఈ సందేశం భద్రతా తనిఖీలలో విఫలమైంది. స్పందించవద్దు.",
                ta: riskScore === 0 ? "பாதுகாப்பானது என சரிபார்க்கப்பட்டது: அனைத்து 5 பாதுகாப்பு சோதனைகளிலும் தேர்ச்சி பெற்றது." : "மோசடி எச்சரிக்கை: இந்த செய்தி பாதுகாப்பு சோதனையில் தோல்வியடைந்தது. தொடர்பு கொள்ள வேண்டாம்."
            };

            resolve({
                riskScore,
                riskLevel,
                summary: summaries[currentLang] || summaries.en,
                indicators
            });
        }, 800);
    });
}

function showResult(data) {
    const res = elements.display.result;
    // Fix: Force 'isScam' to true if risk level says SCAM, even if score is weird.
    const isScam = data.riskScore > 60 || data.riskLevel.includes('SCAM') || data.riskLevel.includes('MALWARE');
    const isError = data.riskLevel.toLowerCase().includes('error') || data.riskLevel.toLowerCase().includes('missing');

    res.innerHTML = `
        <div class="result-card" style="border-color: ${isError ? 'var(--warning)' : (isScam ? 'var(--danger)' : 'var(--success)')}">
            <div style="display: flex; justify-content: space-between; width: 100%;">
                <div class="gauge-container">
                    <svg viewBox="0 0 36 36" style="width:80px; height:80px; transform: rotate(-90deg);">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="3" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="${isError ? 'var(--warning)' : (isScam ? 'var(--danger)' : 'var(--success)')}" stroke-width="3" stroke-dasharray="${data.riskScore}, 100" stroke-linecap="round" />
                    </svg>
                    <div class="gauge-txt" style="font-size: 0.8rem;">${data.riskScore}%</div>
                </div>
                <button class="speaker-btn" id="speak-result">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                </button>
            </div>
            <div class="verdict-tag ${isError ? 'verdict-warning' : (isScam ? 'verdict-high' : 'verdict-low')}" style="margin-top: 10px;">${data.riskLevel}</div>
            <p class="result-summary" style="text-align: center;">${data.summary}</p>
            ${isScam ? `<button class="immediate-action-btn" id="btn-take-action">TAKE IMMEDIATE ACTION</button>` : ''}
            ${isError ? `<button class="mini-action-btn" onclick="location.reload()" style="margin-top:10px; padding: 8px 16px; font-size: 0.75rem;">Retry Everything</button>` : ''}
        </div>
    `;
    res.classList.remove('hidden');
    const speakBtn = document.getElementById('speak-result');
    speakBtn.onclick = () => speak(data.summary, speakBtn);
    if (isScam) document.getElementById('btn-take-action').onclick = () => switchView('victim');
    res.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Victim Support Logic
if (elements.buttons.victimNext) {
    elements.buttons.victimNext.onclick = () => {
        generateReport(
            document.getElementById('victim-method').value,
            document.getElementById('victim-amount').value.trim() || '₹0',
            document.getElementById('victim-suspect').value.trim() || 'Unknown',
            document.getElementById('victim-desc').value.trim() || 'No description',
            document.getElementById('victim-name').value.trim() || 'Unknown',
            document.getElementById('victim-number').value.trim() || 'Not Provided'
        );
        document.getElementById('step-1').classList.remove('active');
        document.getElementById('step-2').classList.add('active');
    };
}
if (elements.buttons.victimReset) {
    elements.buttons.victimReset.onclick = () => {
        document.getElementById('step-2').classList.remove('active');
        document.getElementById('step-1').classList.add('active');
    };
}

// Voice Reporting Logic
const btnRecord = document.getElementById('btn-start-record');
if (btnRecord) {
    const status = document.getElementById('record-status');

    btnRecord.onclick = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Voice input not supported in this browser.');
            return;
        }

        const recognition = new webkitSpeechRecognition();
        recognition.lang = currentLang === 'en' ? 'en-US' : (currentLang + '-IN');
        recognition.continuous = false;
        recognition.interimResults = false;

        status.innerText = i18n[currentLang].listening;
        status.style.color = '#a855f7';
        btnRecord.style.transform = "scale(1.1)";
        btnRecord.style.boxShadow = "0 0 30px rgba(168, 85, 247, 0.6)";

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            processVoiceInput(text);
        };

        recognition.onerror = () => {
            resetRecordUI();
        };

        recognition.onend = () => {
            resetRecordUI();
        };

        recognition.start();
    };

    function resetRecordUI() {
        status.innerText = i18n[currentLang].tap_to_speak;
        status.style.color = 'var(--text-muted)';
        btnRecord.style.transform = "scale(1)";
        btnRecord.style.boxShadow = "0 0 20px rgba(99, 102, 241, 0.4)";
    }

    function processVoiceInput(text) {
        // 1. Fill Description with everything
        const descField = document.getElementById('victim-desc');
        const existing = descField.value ? descField.value + "\n" : "";
        descField.value = existing + text;

        // 2. Smart Extraction
        // Name: "My name is [Name]" or "Name is [Name]"
        const nameMatch = text.match(/(?:my name is|name is|i am)\s+([a-zA-Z\s]+?)(?:\.|,|\sand|\swith|$)/i);
        if (nameMatch && nameMatch[1]) {
            document.getElementById('victim-name').value = nameMatch[1].trim();
        }

        // Phone: 10 digits
        const phoneMatch = text.match(/[\d\s-]{10,}/);
        if (phoneMatch) {
            const cleanNumber = phoneMatch[0].replace(/\D/g, '');
            if (cleanNumber.length >= 10) {
                document.getElementById('victim-number').value = cleanNumber;
            }
        }

        // Amount: Digits
        // If user says "5000 rupees", we catch "5000"
        const amountMatch = text.match(/((?:rs\.?|rupees|₹)?\s*\d+(?:,\d+)*\s*(?:k|thousand|lakh|crore)?)/i);
        if (amountMatch) {
            // Basic, just put matched amount if field is empty
            if (!document.getElementById('victim-amount').value) {
                document.getElementById('victim-amount').value = amountMatch[1];
            }
        }
    }
}

function generateReport(method, amount, suspect, description, name, number) {
    const hub = elements.display.reportHub;
    const lang = i18n[currentLang];
    const currentDate = new Date().toLocaleDateString('en-IN');

    // Sanitize and Default
    name = (name && name.length > 1 && name !== 'Unknown') ? name : "___________________";
    number = (number && number.length > 5 && number !== 'Not Provided') ? number : "___________________";
    amount = (amount && amount !== '₹0') ? amount : "__________";

    let letterBody = "";

    // Professional Templates
    if (currentLang === 'en') {
        letterBody = `To,
The Officer-in-Charge,
Cyber Crime Cell / Local Police Station.

Subject: Formal Complaint regarding Cyber Financial Fraud via ${method} - Request for investigation.

Respected Sir/Madam,

I am writing to formally report a financial fraud committed against me. I request your immediate intervention to freeze the fraudster's accounts and recover my lost funds.

1. COMPLAINANT DETAILS:
   Name: ${name}
   Mobile: ${number}

2. INCIDENT DETAILS:
   Date of Incident: ${currentDate}
   Fraud Method: ${method}
   Amount Lost: ${amount}

3. SUSPECT DETAILS:
   The fraudster used the following contact/account details:
   ${suspect}

4. DESCRIPTION OF INCIDENT:
   ${description}

I have attached screenshots and transaction proofs to support this claim. I request you to register an FIR under relevant sections of the IT Act and IPC, and take necessary action to block the beneficiary account immediately.

Sincerely,
${name}
Date: ${currentDate}`;
    } else if (currentLang === 'hi') {
        letterBody = `सेवा में,
प्रभारी अधिकारी,
साइबर अपराध शाखा / स्थानीय पुलिस स्टेशन।

विषय: ${method} के माध्यम से वित्तीय धोखाधड़ी के संबंध में औपचारिक शिकायत - जाँच हेतु अनुरोध।

महोदय/महोदया,

मैं अपने साथ हुई वित्तीय धोखाधड़ी की रिपोर्ट करने के लिए यह पत्र लिख रहा/रही हूँ। आपसे अनुरोध है कि मेरी शिकायत दर्ज करें और मेरी धनराशि सुरक्षित करने में मदद करें।

1. शिकायतकर्ता का विवरण:
   नाम: ${name}
   मोबाइल: ${number}

2. घटना का विवरण:
   दिनांक: ${currentDate}
   धोखाधड़ी का तरीका: ${method}
   खोई हुई राशि: ${amount}

3. संदिग्ध का विवरण:
   धोखेबाज ने निम्नलिखित संपर्क/खाता विवरण का उपयोग किया:
   ${suspect}

4. घटना का विस्तृत वर्णन:
   ${description}

मैं इस दावे के समर्थन में स्क्रीनशॉट और लेनदेन की रसीदें संलग्न कर रहा/रही हूँ। मेरी आपसे प्रार्थना है कि आईटी अधिनियम और आईपीसी की संबंधित धाराओं के तहत एफआईआर दर्ज करें और लाभार्थी खाते को तुरंत फ्रीज करने की कृपा करें।

सादर,
${name}
दिनांक: ${currentDate}`;
    } else {
        // Fallback for other languages (Structured)
        const l = i18n[currentLang];
        letterBody = `${l.fir_to}
        
${l.fir_sub} ${method} (${amount})

${l.app_name} User Report
Name: ${name}
Mobile: ${number}
Date: ${currentDate}

${l.fir_sus}
${suspect}

${l.fir_desc}
${description}

[Please attach this draft with your official police complaint]`;
    }

    hub.innerHTML = `
        <div class="report-item"><div><h4>${lang.rec_title1}</h4><p>${lang.rec_desc1}</p></div></div>
        <div class="report-item"><div><h4>${lang.rec_title2}</h4><p>${lang.rec_desc2}</p></div></div>
        <div style="margin-top: 24px; border-top: 1px solid var(--glass-border); padding-top: 24px; position: relative;">
            <button class="speaker-btn" id="speak-report" style="position: absolute; right: 0; top: 15px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            </button>
            <div class="complaint-box" id="complaint-text" style="white-space: pre-line; text-align: left; background: rgba(255,255,255,0.03); padding: 25px; border-radius: 12px; font-size: 0.95rem; color: #e2e8f0; font-family: 'Times New Roman', serif; line-height: 1.6;">
${letterBody}
            </div>
            <button class="copy-btn" id="btn-copy" style="width:100%; justify-content:center; margin-top:16px;">${lang.copy_btn}</button>
        </div>
    `;
    const speakBtn = document.getElementById('speak-report');
    speakBtn.onclick = () => speak(document.getElementById('complaint-text').innerText, speakBtn);
    document.getElementById('btn-copy').onclick = () => navigator.clipboard.writeText(document.getElementById('complaint-text').innerText).then(() => showNotification(lang.copied));
}

// Start App
(async () => {
    // PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker Registered!', reg))
            .catch(err => console.log('SW Registration Failed', err));
    }

    console.log("ScamGuard+ [Gemini Local] - Active at: " + new Date().toLocaleTimeString());
    try {
        await loadState();
        if (elements.lang) elements.lang.value = currentLang;
        await updateLanguage();
        window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
    } catch (e) {
        console.error("Boot Error:", e);
    }
})();

// PWA Installation Logic
let deferredPrompt;
const installBtn = elements.buttons.installPwa;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) {
        installBtn.style.display = 'flex';
        installBtn.classList.remove('hidden');
    }
});

if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
        installBtn.style.display = 'none';
    });
}

// Mobile Detection Updates
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 800;
if (isMobile) {
    document.querySelector('.desktop-container').style.borderRadius = "0";
    document.querySelector('.desktop-container').style.maxHeight = "100vh";
    document.querySelector('.desktop-container').style.height = "100vh";
}

// Update Status Text based on Platform
const statusPillText = document.querySelector('.status-pill span');
if (statusPillText) {
    const baseText = i18n[currentLang].app_status.replace(/\(.*\)/, '').trim();
    statusPillText.innerText = `${baseText} (${isMobile ? 'Mobile' : 'Desktop'})`;
}
