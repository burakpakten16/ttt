import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

// Burç simgeleri ve bilgileri
const zodiacSigns = {
  koc: {
    name: "Koç",
    dates: "21 Mart - 19 Nisan",
    element: "Ateş",
    icon: "🐏"
  },
  boga: {
    name: "Boğa",
    dates: "20 Nisan - 20 Mayıs",
    element: "Toprak",
    icon: "🐂"
  },
  ikizler: {
    name: "İkizler",
    dates: "21 Mayıs - 20 Haziran",
    element: "Hava",
    icon: "👥"
  },
  // Diğer burçlar benzer şekilde eklenecek
};

// Yorum üreteci fonksiyonu
const generateHoroscope = (sign) => {
  const aspects = {
    love: [
      "Duygusal bağlarınız güçlenecek",
      "Yeni bir aşk kapıda olabilir",
      "İlişkinizde derin konuşmalar sizi bekliyor",
      "Partneriyle iletişiminiz güçlenecek",
      "Romantik sürprizlere açık olun"
    ],
    career: [
      "Kariyer fırsatları kapınızı çalacak",
      "İş yerinde yeni sorumluluklar alabilirsiniz",
      "Projeleriniz olumlu sonuçlanacak",
      "Yeni iş teklifleri değerlendirebilirsiniz",
      "Mesleki gelişiminiz hız kazanacak"
    ],
    health: [
      "Enerjiniz yüksek olacak",
      "Spor yapmak için uygun bir gün",
      "Sağlıklı beslenmeye özen gösterin",
      "Mental sağlığınıza dikkat edin",
      "Düzenli uyku önemli olacak"
    ],
    finance: [
      "Beklenmedik kazançlar olabilir",
      "Yatırımlarınız meyvesini verecek",
      "Harcamalarınızı kontrol altında tutun",
      "Finansal kararlar için uygun bir gün",
      "Bütçenizi gözden geçirin"
    ]
  };

  const getRandomPrediction = (category) => {
    const predictions = aspects[category];
    return predictions[Math.floor(Math.random() * predictions.length)];
  };

  return {
    love: getRandomPrediction('love'),
    career: getRandomPrediction('career'),
    health: getRandomPrediction('health'),
    finance: getRandomPrediction('finance'),
    date: new Date().toLocaleDateString('tr-TR')
  };
};

// Ana uygulama bileşeni
const App = () => {
  const [selectedSign, setSelectedSign] = useState(null);
  const [horoscope, setHoroscope] = useState(null);

  useEffect(() => {
    if (selectedSign) {
      setHoroscope(generateHoroscope(selectedSign));
    }
  }, [selectedSign]);

  // Her gece yarısı yorumları güncelle
  useEffect(() => {
    const now = new Date();
    const night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0
    );
    const msToMidnight = night.getTime() - now.getTime();

    const timer = setTimeout(() => {
      if (selectedSign) {
        setHoroscope(generateHoroscope(selectedSign));
      }
    }, msToMidnight);

    return () => clearTimeout(timer);
  }, [selectedSign]);

  if (!selectedSign) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Burcunuzu Seçin</Text>
        <View style={styles.signsGrid}>
          {Object.entries(zodiacSigns).map(([key, sign]) => (
            <TouchableOpacity
              key={key}
              style={styles.signButton}
              onPress={() => setSelectedSign(key)}
            >
              <Text style={styles.signIcon}>{sign.icon}</Text>
              <Text style={styles.signName}>{sign.name}</Text>
              <Text style={styles.signDates}>{sign.dates}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setSelectedSign(null)}
      >
        <Text style={styles.backButtonText}>← Geri</Text>
      </TouchableOpacity>

      <View style={styles.horoscopeContainer}>
        <Text style={styles.selectedSignTitle}>
          {zodiacSigns[selectedSign].icon} {zodiacSigns[selectedSign].name}
        </Text>
        <Text style={styles.date}>{horoscope.date}</Text>

        <View style={styles.aspectContainer}>
          <Text style={styles.aspectTitle}>💝 Aşk</Text>
          <Text style={styles.aspectText}>{horoscope.love}</Text>
        </View>

        <View style={styles.aspectContainer}>
          <Text style={styles.aspectTitle}>💼 Kariyer</Text>
          <Text style={styles.aspectText}>{horoscope.career}</Text>
        </View>

        <View style={styles.aspectContainer}>
          <Text style={styles.aspectTitle}>🏥 Sağlık</Text>
          <Text style={styles.aspectText}>{horoscope.health}</Text>
        </View>

        <View style={styles.aspectContainer}>
          <Text style={styles.aspectTitle}>💰 Finans</Text>
          <Text style={styles.aspectText}>{horoscope.finance}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    color: '#333',
  },
  signsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  signButton: {
    width: '45%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signIcon: {
    fontSize: 32,
    marginBottom: 5,
  },
  signName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  signDates: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  backButton: {
    padding: 15,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  horoscopeContainer: {
    padding: 20,
  },
  selectedSignTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  aspectContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  aspectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  aspectText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
});

export default App;