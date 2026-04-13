// ชุดที่ 1: หมวดพื้นฐานการทำงานและการใช้ชีวิต (Essential Work & Daily Life)
const vocabEN = [
    // --- หมวดการทำงานและการนัดหมาย ---
    { thai: "พรุ่งนี้มีประชุมไหม?", target: "Is there a meeting tomorrow?", reading: "อิส แดร์ อะ มีทติ้ง ทูมอร์โรว์", lang: "en-US" },
    { thai: "ฉันต้องการนำเสนอไอเดีย", target: "I would like to present an idea.", reading: "ไอ วูด ไลค์ ทู พรีเซนต์ แอน ไอเดีย", lang: "en-US" },
    { thai: "คุณคิดอย่างไรกับแผนนี้?", target: "What do you think about this plan?", reading: "วอท ดู ยู ธิงค์ อะเบาท์ ดิส แพลน", lang: "en-US" },
    { thai: "ส่งอีเมลให้ฉันหน่อย", target: "Please send me an email.", reading: "พลีส เซนด์ มี แอน อีเมล", lang: "en-US" },
    { thai: "กลยุทธ์คืออะไร?", target: "What is the strategy?", reading: "วอท อิส เดอะ สแตรทิจี", lang: "en-US" },
    { thai: "เราต้องทำตามเป้าหมาย", target: "We need to meet the target.", reading: "วี นี๊ด ทู มีท เดอะ ทาร์เก็ต", lang: "en-US" },
    { thai: "ขอโทษที่มาสาย", target: "Sorry for being late.", reading: "ซอร์รี่ ฟอร์ บีอิ้ง เลท", lang: "en-US" },
    { thai: "ขอเวลาสักครู่ได้ไหม?", target: "Do you have a minute?", reading: "ดู ยู แฮฟ อะ มินิท", lang: "en-US" },

    // --- หมวดสุขภาพและกิจวัตร ---
    { thai: "ฉันพยายามนอนก่อนสี่ทุ่ม", target: "I try to go to bed before 10 PM.", reading: "ไอ ไทร ทู โก ทู เบด บีฟอร์ เท็น พีเอ็ม", lang: "en-US" },
    { thai: "มื้อเช้าสำคัญมาก", target: "Breakfast is very important.", reading: "เบรคฟาสต์ อิส เวรี่ อิมพอร์แทนท์", lang: "en-US" },
    { thai: "วันนี้ฉันรู้สึกกระปรี้กระเปร่า", target: "I feel energetic today.", reading: "ไอ ฟีล เอ็นเนอร์เจติก ทูเดย์", lang: "en-US" },
    { thai: "ฉันต้องออกกำลังกาย", target: "I need to exercise.", reading: "ไอ นี๊ด ทู เอ็กเซอร์ไซส์", lang: "en-US" },
    { thai: "ขอโยเกิร์ตหน่อย", target: "Can I have some yogurt?", reading: "แคน ไอ แฮฟ ซัม โยเกิร์ต", lang: "en-US" },

    // --- หมวดการเงินเบื้องต้น ---
    { thai: "ฉันลงทุนทุกเดือน", target: "I invest every month.", reading: "ไอ อินเวสต์ เอฟรี่ มันธ์", lang: "en-US" },
    { thai: "นี่คือการลงทุนระยะยาว", target: "This is a long-term investment.", reading: "ดิส อิส อะ ลองเทอม อินเวสต์เมนท์", lang: "en-US" },
    { thai: "ราคาเท่าไหร่?", target: "How much does it cost?", reading: "ฮาว มัช ดาส อิท คอสท์", lang: "en-US" },
    { thai: "แพงเกินไป", target: "It is too expensive.", reading: "อิท อิส ทู เอ็กซ์เพนซีฟ", lang: "en-US" },

    // --- หมวดการถามทางและทั่วไป ---
    { thai: "ช่วยฉันหน่อยได้ไหม?", target: "Can you help me?", reading: "แคน ยู เฮลพ์ มี", lang: "en-US" },
    { thai: "ฉันไม่เข้าใจ", target: "I don't understand.", reading: "ไอ โดนท์ อันเดอร์สแตนด์", lang: "en-US" },
    { thai: "พูดช้าๆ หน่อย", target: "Please speak slowly.", reading: "พลีส สปีค สโลว์ลี่", lang: "en-US" },
    { thai: "คุณพูดภาษาไทยได้ไหม?", target: "Can you speak Thai?", reading: "แคน ยู สปีค ไทย", lang: "en-US" },
    { thai: "เจอกันพรุ่งนี้", target: "See you tomorrow.", reading: "ซี ยู ทูมอร์โรว์", lang: "en-US" },
    { thai: "โชคดีนะ", target: "Good luck.", reading: "กู๊ด ลัค", lang: "en-US" },
    { thai: "ยินดีที่ได้รู้จัก", target: "Nice to meet you.", reading: "ไนซ์ ทู มีท ยู", lang: "en-US" },
    { thai: "ขอบคุณสำหรับความช่วยเหลือ", target: "Thank you for your help.", reading: "แธงค์ กิ้ว ฟอร์ ยัวร์ เฮลพ์", lang: "en-US" },
// --- หมวดการเดินทางและสถานที่ (Travel & Directions) ---
    { thai: "สถานีรถไฟอยู่ที่ไหน?", target: "Where is the train station?", reading: "แวร์ อิส เดอะ เทรน สเตชั่น", lang: "en-US" },
    { thai: "ฉันกำลังมองหาสถานที่นี้", target: "I am looking for this place.", reading: "ไอ แอม ลุคกิ้ง ฟอร์ ดิส เพลส", lang: "en-US" },
    { thai: "เลี้ยวซ้าย / เลี้ยวขวา", target: "Turn left / Turn right.", reading: "เทิร์น เลฟท์ / เทิร์น ไรท์", lang: "en-US" },
    { thai: "เดินตรงไป", target: "Go straight.", reading: "โก สเตรท", lang: "en-US" },
    { thai: "มันไกลแค่ไหน?", target: "How far is it?", reading: "ฮาว ฟาร์ อิส อิท", lang: "en-US" },
    { thai: "พาฉันไปที่อยู่นี้หน่อย", target: "Take me to this address, please.", reading: "เทค มี ทู ดิส แอดเดรส พลีส", lang: "en-US" },
    { thai: "ฉันจะหาแท็กซี่ได้ที่ไหน?", target: "Where can I find a taxi?", reading: "แวร์ แคน ไอ ไฟนด์ อะ แท็กซี่", lang: "en-US" },
    { thai: "เที่ยวบินเวลากี่โมง?", target: "What time is the flight?", reading: "วอท ไทม์ อิส เดอะ ไฟลท์", lang: "en-US" },
    { thai: "ประตูขึ้นเครื่องที่ 5 อยู่ที่ไหน?", target: "Where is boarding gate 5?", reading: "แวร์ อิส บอร์ดดิ้ง เกท ไฟฟ์", lang: "en-US" },

    // --- หมวดที่พักแรม (Accommodation) ---
    { thai: "ฉันต้องการเช็คอิน", target: "I would like to check in.", reading: "ไอ วูด ไลค์ ทู เช็ค อิน", lang: "en-US" },
    { thai: "ฉันมีจองไว้แล้ว", target: "I have a reservation.", reading: "ไอ แฮฟ อะ เรเซอร์เวชั่น", lang: "en-US" },
    { thai: "คุณมีห้องว่างไหม?", target: "Do you have any available rooms?", reading: "ดู ยู แฮฟ เอนี่ อะเวลเลเบิล รูมส์", lang: "en-US" },
    { thai: "รหัสไวไฟคืออะไร?", target: "What is the Wi-Fi password?", reading: "วอท อิส เดอะ ไวไฟ พาสเวิร์ด", lang: "en-US" },
    { thai: "ขอผ้าเช็ดตัวเพิ่มได้ไหม?", target: "Can I have an extra towel?", reading: "แคน ไอ แฮฟ แอน เอ็กซ์ตร้า ทาวเวล", lang: "en-US" },

    // --- หมวดร้านอาหารและการซื้อของ (Dining & Shopping) ---
    { thai: "ขอโต๊ะสำหรับสองที่ครับ/ค่ะ", target: "A table for two, please.", reading: "อะ เทเบิล ฟอร์ ทู พลีส", lang: "en-US" },
    { thai: "ขอดูเมนูหน่อยได้ไหม?", target: "Can I see the menu?", reading: "แคน ไอ ซี เดอะ เมนู", lang: "en-US" },
    { thai: "อันนี้เผ็ดไหม?", target: "Is it spicy?", reading: "อิส อิท สไปซี่", lang: "en-US" },
    { thai: "ไม่ใส่น้ำแข็งครับ/ค่ะ", target: "No ice, please.", reading: "โน ไอซ์ พลีส", lang: "en-US" },
    { thai: "ฉันขอน้ำเปล่า", target: "I would like some water.", reading: "ไอ วูด ไลค์ ซัม วอเทอร์", lang: "en-US" },
    { thai: "ฉันจ่ายด้วยบัตรเครดิตได้ไหม?", target: "Can I pay by credit card?", reading: "แคน ไอ เพย์ บาย เครดิต การ์ด", lang: "en-US" },
    { thai: "แค่ดูเฉยๆ ขอบคุณครับ/ค่ะ (เวลาพนักงานร้านเข้ามาถาม)", target: "I'm just browsing, thank you.", reading: "ไอม จัสท์ เบราซ์ซิ่ง แธงค์ กิ้ว", lang: "en-US" },

    // --- หมวดฉุกเฉินและการขอความช่วยเหลือ (Emergency) ---
    { thai: "ฉันทำพาสปอร์ตหาย", target: "I lost my passport.", reading: "ไอ ลอสต์ มาย พาสปอร์ต", lang: "en-US" },
    { thai: "ฉันต้องการหมอ", target: "I need a doctor.", reading: "ไอ นี๊ด อะ ด็อกเตอร์", lang: "en-US" },
    { thai: "โรงพยาบาลที่ใกล้ที่สุดอยู่ที่ไหน?", target: "Where is the nearest hospital?", reading: "แวร์ อิส เดอะ เนียร์เรสต์ ฮอสปิตัล", lang: "en-US" },
    { thai: "เรียกตำรวจ!", target: "Call the police!", reading: "คอล เดอะ โพลิส", lang: "en-US" },
	// --- หมวดกลยุทธ์ธุรกิจและการตลาด (Business Strategy & Marketing) ---
    { thai: "เป้าหมายประจำปีคืออะไร?", target: "What is the annual target?", reading: "วอท อิส ดิ แอนนวล ทาร์เก็ต", lang: "en-US" },
    { thai: "เรากำลังวางแผนแคมเปญการตลาด", target: "We are planning a marketing campaign.", reading: "วี อาร์ แพลนนิ่ง อะ มาร์เก็ตติ้ง แคมเปญ", lang: "en-US" },
    { thai: "ฉันกำลังเขียนสคริปต์วิดีโอ", target: "I am writing a video script.", reading: "ไอ แอม ไรติ้ง อะ วิดีโอ สคริปต์", lang: "en-US" },
    { thai: "คาเฟ่นี้บรรยากาศดีมาก", target: "This cafe has a great atmosphere.", reading: "ดิส คาเฟ่ แฮส อะ เกรท แอทมอสเฟียร์", lang: "en-US" },
    { thai: "อัตรากำไรอยู่ที่เท่าไหร่?", target: "How much is the profit margin?", reading: "ฮาว มัช อิส เดอะ โปรฟิต มาร์จิ้น", lang: "en-US" },
    { thai: "เราต้องคำนวณต้นทุนวัตถุดิบ", target: "We need to calculate the material costs.", reading: "วี นี๊ด ทู แคลคิวเลท เดอะ แมททีเรียล คอสต์ส", lang: "en-US" },
    { thai: "เราต้องเตรียมการนำเสนอ", target: "We need to prepare a presentation.", reading: "วี นี๊ด ทู พรีแพร์ อะ พรีเซนเทชั่น", lang: "en-US" },

    // --- หมวดเทคโนโลยีและการพัฒนาแอป (Technology & Web Development) ---
    { thai: "ฉันกำลังเขียนโค้ดสำหรับเว็บแอปพลิเคชัน", target: "I am coding for a web application.", reading: "ไอ แอม โค้ดดิ้ง ฟอร์ อะ เว็บ แอปพลิเคชัน", lang: "en-US" },
    { thai: "ฟังก์ชันนี้ทำงานอย่างไร?", target: "How does this function work?", reading: "ฮาว ดาส ดิส ฟังก์ชัน เวิร์ก", lang: "en-US" },
    { thai: "เราต้องเชื่อมต่อฐานข้อมูล", target: "We need to connect the database.", reading: "วี นี๊ด ทู คอนเน็ค เดอะ ดาต้าเบส", lang: "en-US" },
    { thai: "มีข้อผิดพลาดในระบบ", target: "There is an error in the system.", reading: "แดร์ อิส แอน เออร์เรอร์ อิน เดอะ ซิสเต็ม", lang: "en-US" },
    { thai: "หน้าตาแอปพลิเคชันดูสะอาดตามาก", target: "The user interface is very clean.", reading: "เดอะ ยูสเซอร์ อินเตอร์เฟส อิส เวรี่ คลีน", lang: "en-US" },

    // --- หมวดการลงทุนและการเงิน (Investment & Finance) ---
    { thai: "ฉันลงทุนแบบถัวเฉลี่ยต้นทุน", target: "I invest using Dollar Cost Averaging.", reading: "ไอ อินเวสต์ ยูสซิ่ง ดอลลาร์ คอสต์ เอเวอเรจจิ้ง", lang: "en-US" },
    { thai: "เป้าหมายการเกษียณของฉันคืออายุหกสิบปี", target: "My retirement goal is age sixty.", reading: "มาย รีไทร์เมนท์ โกล อิส เอจ ซิกตี้", lang: "en-US" },
    { thai: "ฉันต้องการกระจายความเสี่ยงในพอร์ตการลงทุน", target: "I want to diversify my portfolio.", reading: "ไอ ว้อนท์ ทู ไดเวอร์ซิฟาย มาย พอร์ตโฟลิโอ", lang: "en-US" },
    { thai: "ตลาดหุ้นมีความผันผวนสูง", target: "The stock market is volatile.", reading: "เดอะ สต็อก มาร์เก็ต อิส โวลาไทล์", lang: "en-US" },
    { thai: "การลงทุนระยะยาวคือกุญแจสำคัญ", target: "Long-term investment is the key.", reading: "ลองเทอม อินเวสต์เมนท์ อิส เดอะ คีย์", lang: "en-US" },

    // --- หมวดโภชนาการและตรรกะ (Nutrition, Health & Logic) ---
    { thai: "ฉันดูแลสุขภาพระบบเผาผลาญ", target: "I take care of my metabolic health.", reading: "ไอ เทค แคร์ ออฟ มาย เมตาบอลิก เฮลท์", lang: "en-US" },
    { thai: "โยเกิร์ตและธัญพืชมีคุณค่าทางโภชนาการสูง", target: "Yogurt and seeds are highly nutritious.", reading: "โยเกิร์ต แอนด์ ซีดส์ อาร์ ไฮลี่ นิวทริเชียส", lang: "en-US" },
    { thai: "ฉันต้องการพัฒนาความพร้อมของร่างกาย", target: "I want to improve my physical readiness.", reading: "ไอ ว้อนท์ ทู อิมพรูฟ มาย ฟิสิคัล เรดี้เนส", lang: "en-US" },
    { thai: "เราต้องปรับโครงสร้างกลยุทธ์ให้เหมาะสมที่สุด", target: "We need to optimize our strategy.", reading: "วี นี๊ด ทู ออปติไมซ์ อาวเวอร์ สแตรทิจี", lang: "en-US" },
    { thai: "สิ่งนี้ต้องใช้ความคิดเชิงตรรกะ", target: "This requires logical thinking.", reading: "ดิส รีไควร์ส ลอจิคัล ธิงกิ้ง", lang: "en-US" },
    { thai: "มาวิเคราะห์ค่าสถิติกันเถอะ", target: "Let's analyze the statistics.", reading: "เลทส์ อนาไลซ์ เดอะ สแตททิสติกส์", lang: "en-US" },
    { thai: "ฉันกำลังสร้างทีมสำหรับการแข่งขัน", target: "I am building a competitive team.", reading: "ไอ แอม บิวด์ดิ้ง อะ คอมเพททิทีฟ ทีม", lang: "en-US" },
	// --- หมวดการเข้าสังคมและทำความรู้จัก (Socializing & Small Talk) ---
    { thai: "คุณทำอาชีพอะไร?", target: "What do you do for a living?", reading: "วอท ดู ยู ดู ฟอร์ อะ ลีฟวิ่ง", lang: "en-US" },
    { thai: "งานอดิเรกของคุณคืออะไร?", target: "What are your hobbies?", reading: "วอท อาร์ ยัวร์ ฮ็อบบี้ส์", lang: "en-US" },
    { thai: "ฉันชอบเล่นเกมและเขียนโปรแกรม", target: "I like playing games and coding.", reading: "ไอ ไลค์ เพลย์อิ้ง เกมส์ แอนด์ โค้ดดิ้ง", lang: "en-US" },
    { thai: "วันหยุดนี้คุณมีแผนจะทำอะไร?", target: "What are your plans for this weekend?", reading: "วอท อาร์ ยัวร์ แพลนส์ ฟอร์ ดิส วีคเอนด์", lang: "en-US" },
    { thai: "คุณชอบดูหนังแนวไหน?", target: "What kind of movies do you like?", reading: "วอท ไคนด์ ออฟ มูวี่ส์ ดู ยู ไลค์", lang: "en-US" },
    { thai: "ฟังดูน่าสนุกนะ", target: "That sounds like fun.", reading: "แดท ซาวด์ส ไลค์ ฟัน", lang: "en-US" },

    // --- หมวดการแสดงความคิดเห็นและความรู้สึก (Opinions & Feelings) ---
    { thai: "ฉันเห็นด้วยอย่างยิ่ง", target: "I completely agree.", reading: "ไอ คอมพลีทลี่ อะกรี", lang: "en-US" },
    { thai: "ฉันไม่ค่อยแน่ใจเรื่องนั้น", target: "I am not sure about that.", reading: "ไอ แอม นอท ชัวร์ อะเบาท์ แดท", lang: "en-US" },
    { thai: "นั่นเป็นไอเดียที่ยอดเยี่ยมมาก", target: "That is a wonderful idea.", reading: "แดท อิส อะ วันเดอร์ฟูล ไอเดีย", lang: "en-US" },
    { thai: "ฉันคิดว่ามันเป็นไปได้", target: "I think it is possible.", reading: "ไอ ธิงค์ อิท อิส พอสซิเบิล", lang: "en-US" },
    { thai: "วันนี้ฉันรู้สึกเหนื่อยจัง", target: "I feel so tired today.", reading: "ไอ ฟีล โซ ไทร์ด ทูเดย์", lang: "en-US" },
    { thai: "ฉันกำลังตื่นเต้นมาก", target: "I am very excited.", reading: "ไอ แอม เวรี่ เอ็กซ์ไซเต็ด", lang: "en-US" },

    // --- หมวดงานอดิเรก การฝึกฝน และกลไกต่างๆ (Hobbies, Mechanics & Training) ---
    { thai: "เราต้องฝึกฝนเพื่อเพิ่มทักษะ", target: "We need to train to improve our skills.", reading: "วี นี๊ด ทู เทรน ทู อิมพรูฟ อาวเวอร์ สกิลส์", lang: "en-US" },
    { thai: "ฉันกำลังมองหาวิธีที่ดีที่สุด", target: "I am looking for the best method.", reading: "ไอ แอม ลุคกิ้ง ฟอร์ เดอะ เบสต์ เมธอด", lang: "en-US" },
    { thai: "สถิตินี้สำคัญมากสำหรับการแข่งขัน", target: "This stat is very important for the competition.", reading: "ดิส สแตท อิส เวรี่ อิมพอร์แทนท์ ฟอร์ เดอะ คอมเพททิชั่น", lang: "en-US" },
    { thai: "ฉันชอบวิเคราะห์กลยุทธ์", target: "I like analyzing strategies.", reading: "ไอ ไลค์ อนาไลซิ่ง สแตรทิจีส์", lang: "en-US" },
    { thai: "ตัวละครนี้มีความสามารถพิเศษ", target: "This character has a special ability.", reading: "ดิส คาแรคเตอร์ แฮส อะ สเปเชียล อะบิลิตี้", lang: "en-US" },
    { thai: "มาลองจัดทีมใหม่กันเถอะ", target: "Let's try building a new team.", reading: "เลทส์ ไทร บิวด์ดิ้ง อะ นิว ทีม", lang: "en-US" },
	// --- หมวดคำกริยา คำคุณศัพท์ และคำเชื่อมประโยค (Core Verbs, Adjectives & Connectors) ---
    { thai: "ฉันต้องทำให้เสร็จ", target: "I need to finish this.", reading: "ไอ นี๊ด ทู ฟินิช ดิส", lang: "en-US" },
    { thai: "มาเริ่มกันเลยเถอะ", target: "Let's start right now.", reading: "เลทส์ สตาร์ท ไรท์ นาว", lang: "en-US" },
    { thai: "ฉันยังไม่ได้ตัดสินใจ", target: "I haven't decided yet.", reading: "ไอ แฮฟเวินท์ ดีไซด์เด็ด เยท", lang: "en-US" },
    { thai: "เราจะปรับปรุงสิ่งนี้ได้อย่างไร?", target: "How can we improve this?", reading: "ฮาว แคน วี อิมพรูฟ ดิส", lang: "en-US" },
    { thai: "ฉันหามันไม่เจอ", target: "I cannot find it.", reading: "ไอ แคนน็อท ไฟนด์ อิท", lang: "en-US" },
    { thai: "ตอนนี้ฉันยุ่งมาก", target: "I am very busy right now.", reading: "ไอ แอม เวรี่ บิซี่ ไรท์ นาว", lang: "en-US" },
    { thai: "คุณพร้อมหรือยัง?", target: "Are you ready?", reading: "อาร์ ยู เรดี้", lang: "en-US" },
    { thai: "เรื่องนี้น่าสนใจมาก", target: "This is very interesting.", reading: "ดิส อิส เวรี่ อินเทอเรสติ้ง", lang: "en-US" },
    { thai: "มันสำคัญมากนะ", target: "It is very important.", reading: "อิท อิส เวรี่ อิมพอร์แทนท์", lang: "en-US" },
    { thai: "จริงๆ แล้ว ฉันคิดว่า...", target: "Actually, I think...", reading: "แอคชวลลี่ ไอ ธิงค์", lang: "en-US" },
    { thai: "นอกจากนี้ เราควรจะ...", target: "Moreover, we should...", reading: "มอร์โอเวอร์ วี ชูด", lang: "en-US" },
    { thai: "อย่างไรก็ตาม มันขึ้นอยู่กับ...", target: "However, it depends on...", reading: "ฮาวเอฟเวอร์ อิท ดีเพนด์ส ออน", lang: "en-US" },
    { thai: "แน่นอนที่สุด!", target: "Absolutely!", reading: "แอบโซลูทลี่", lang: "en-US" },
    { thai: "ไม่มีปัญหาเลย", target: "No problem at all.", reading: "โน พรอบเบลม แอท ออล", lang: "en-US" },
    { thai: "แล้วเจอกันใหม่นะ", target: "Catch you later.", reading: "แคทช์ ยู เลเทอร์", lang: "en-US" }
]; // ปิดท้ายอาเรย์และสิ้นสุดไฟล์ vocab_en.js