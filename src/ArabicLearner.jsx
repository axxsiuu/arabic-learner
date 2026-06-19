import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Play, RotateCcw, Check, X, Plus, Trash2, Calendar, BookOpen } from 'lucide-react';

const ArabicLearnerApp = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [chatHistory, setCharHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState('casual');
  const [correction, setCorrection] = useState('');
  
  // Alphabet
  const [arabicAlphabet] = useState([
    { letter: 'ا', name: 'Alef', sound: 'ah' },
    { letter: 'ب', name: 'Ba', sound: 'bah' },
    { letter: 'ت', name: 'Ta', sound: 'tah' },
    { letter: 'ث', name: 'Tha', sound: 'thah' },
    { letter: 'ج', name: 'Jim', sound: 'jim' },
    { letter: 'ح', name: 'Ha', sound: 'ha' },
    { letter: 'خ', name: 'Kha', sound: 'kha' },
    { letter: 'د', name: 'Dal', sound: 'dal' },
    { letter: 'ذ', name: 'Dhal', sound: 'dhal' },
    { letter: 'ر', name: 'Ra', sound: 'ra' },
    { letter: 'ز', name: 'Zay', sound: 'zay' },
    { letter: 'س', name: 'Sin', sound: 'seen' },
    { letter: 'ش', name: 'Shin', sound: 'sheen' },
    { letter: 'ص', name: 'Sad', sound: 'sad' },
    { letter: 'ض', name: 'Dad', sound: 'dad' },
    { letter: 'ط', name: 'Ta (emphatic)', sound: 'tah' },
    { letter: 'ظ', name: 'Dha (emphatic)', sound: 'dha' },
    { letter: 'ع', name: 'Ain', sound: 'ain' },
    { letter: 'غ', name: 'Ghain', sound: 'ghain' },
    { letter: 'ف', name: 'Fa', sound: 'fah' },
    { letter: 'ق', name: 'Qaf', sound: 'qaf' },
    { letter: 'ك', name: 'Kaf', sound: 'kaf' },
    { letter: 'ل', name: 'Lam', sound: 'lam' },
    { letter: 'م', name: 'Meem', sound: 'meem' },
    { letter: 'ن', name: 'Noon', sound: 'noon' },
    { letter: 'ه', name: 'Ha (final)', sound: 'ha' },
    { letter: 'و', name: 'Waw', sound: 'waw' },
    { letter: 'ي', name: 'Ya', sound: 'ya' },
  ]);

  // Vocab
  const [decks] = useState({
    greetings: [
      { arabic: 'السلام عليكم', english: 'Hello (formal)', pronunciation: 'As-salamu alaikum', learned: false },
      { arabic: 'مرحبا', english: 'Hello', pronunciation: 'Marhaba', learned: false },
      { arabic: 'وعليكم السلام', english: 'And upon you be peace', pronunciation: "Wa alaikum as-salam", learned: false },
      { arabic: 'كيف حالك؟', english: 'How are you?', pronunciation: 'Kayf halak?', learned: false },
      { arabic: 'بخير، شكراً', english: 'Good, thanks', pronunciation: 'Bi-khair, shukran', learned: false },
      { arabic: 'صباح الخير', english: 'Good morning', pronunciation: 'Sabah al-khair', learned: false },
      { arabic: 'مساء الخير', english: 'Good evening', pronunciation: 'Masaa al-khair', learned: false },
      { arabic: 'وداعاً', english: 'Goodbye', pronunciation: 'Wadaan', learned: false },
      { arabic: 'إلى اللقاء', english: 'See you later', pronunciation: 'Ila al-liqaa', learned: false },
      { arabic: 'من فضلك', english: 'Please', pronunciation: 'Min fadlak', learned: false },
    ],
    food: [
      { arabic: 'ماء', english: 'Water', pronunciation: 'Maa', learned: false },
      { arabic: 'خبز', english: 'Bread', pronunciation: 'Khubz', learned: false },
      { arabic: 'لحم', english: 'Meat', pronunciation: 'Lahm', learned: false },
      { arabic: 'دجاج', english: 'Chicken', pronunciation: 'Dijaj', learned: false },
      { arabic: 'سمك', english: 'Fish', pronunciation: 'Samak', learned: false },
      { arabic: 'تفاح', english: 'Apple', pronunciation: 'Tuffah', learned: false },
      { arabic: 'برتقال', english: 'Orange', pronunciation: 'Burtuqal', learned: false },
      { arabic: 'بيض', english: 'Eggs', pronunciation: 'Bayd', learned: false },
      { arabic: 'جبن', english: 'Cheese', pronunciation: 'Jubn', learned: false },
      { arabic: 'شاي', english: 'Tea', pronunciation: 'Shay', learned: false },
    ],
    travel: [
      { arabic: 'فندق', english: 'Hotel', pronunciation: 'Funduq', learned: false },
      { arabic: 'محطة', english: 'Station', pronunciation: 'Mahatta', learned: false },
      { arabic: 'مطار', english: 'Airport', pronunciation: 'Mataar', learned: false },
      { arabic: 'تذكرة', english: 'Ticket', pronunciation: 'Tadhkira', learned: false },
      { arabic: 'حقيبة', english: 'Bag', pronunciation: 'Haqiba', learned: false },
      { arabic: 'خريطة', english: 'Map', pronunciation: 'Kharita', learned: false },
      { arabic: 'شارع', english: 'Street', pronunciation: 'Sharia', learned: false },
      { arabic: 'سيارة', english: 'Car', pronunciation: 'Sayyara', learned: false },
      { arabic: 'طاقم', english: 'Crew', pronunciation: 'Taqm', learned: false },
      { arabic: 'وسادة', english: 'Pillow', pronunciation: 'Wisada', learned: false },
    ],
    numbers: [
      { arabic: '0', english: 'Zero', pronunciation: 'Sifr', learned: false },
      { arabic: '1', english: 'One', pronunciation: 'Wahid', learned: false },
      { arabic: '2', english: 'Two', pronunciation: 'Ithnain', learned: false },
      { arabic: '3', english: 'Three', pronunciation: 'Talata', learned: false },
      { arabic: '4', english: 'Four', pronunciation: 'Arbaa', learned: false },
      { arabic: '5', english: 'Five', pronunciation: 'Khamsa', learned: false },
      { arabic: '6', english: 'Six', pronunciation: 'Sitta', learned: false },
      { arabic: '7', english: 'Seven', pronunciation: 'Sabaa', learned: false },
      { arabic: '8', english: 'Eight', pronunciation: 'Tamaniya', learned: false },
      { arabic: '9', english: 'Nine', pronunciation: 'Tisaa', learned: false },
    ],
  });

  const [currentDeck, setCurrentDeck] = useState('greetings');
  const [vocabCards, setVocabCards] = useState(decks.greetings);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [customTopic, setCustomTopic] = useState('');
  const [customDeck, setCustomDeck] = useState([]);
  const [generatingDeck, setGeneratingDeck] = useState(false);

  // Translation
  const [translationInput, setTranslationInput] = useState('');
  const [translationResult, setTranslationResult] = useState(null);
  const [translationLoading, setTranslationLoading] = useState(false);

  // Progress tracking
  const [streak, setStreak] = useState(0);
  const [wordsLearned, setWordsLearned] = useState(0);
  const recognitionRef = useRef(null);
  const apiKeyRef = useRef('');

  // Initialize app
  useEffect(() => {
    loadProgress();
    initializeSpeechRecognition();
  }, []);

  const loadProgress = () => {
    const saved = localStorage.getItem('arabicLearnerProgress');
    if (saved) {
      const data = JSON.parse(saved);
      setStreak(data.streak || 0);
      setWordsLearned(data.wordsLearned || 0);
    }
  };

  const saveProgress = (newStreak, newWordsLearned) => {
    localStorage.setItem('arabicLearnerProgress', JSON.stringify({
      streak: newStreak,
      wordsLearned: newWordsLearned,
      lastUpdate: new Date().toISOString(),
    }));
  };

  const initializeSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      setTranscript(text);
    };
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognitionRef.current = recognition;
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const speak = (text, lang = 'ar-SA') => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const callClaudeAPI = async (userMessage, context = '') => {
    try {
      setLoading(true);
      
      // For this demo, return mock responses. In production, call Claude API:
      // const response = await fetch('https://api.anthropic.com/v1/messages', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'x-api-key': apiKeyRef.current,
      //   },
      //   body: JSON.stringify({
      //     model: 'claude-3-5-sonnet-20241022',
      //     max_tokens: 1024,
      //     messages: [{ role: 'user', content: userMessage }],
      //   }),
      // });

      // Mock response for demo
      const mockResponses = {
        casual: `مرحبا! أنا سعيد بالتحدث معك اليوم. كيف حالك؟\n\nMarhaba! Ana saa'id bi-al-tahaduth ma'ak al-yawm. Kayf halak?\n\nHello! I'm happy to talk with you today. How are you?`,
        coffee: `هل تريد القهوة أم الشاي؟\n\nHal turaeed al-qahwa am al-shay?\n\nDo you want coffee or tea?`,
        airport: `أين محطة الأمتعة؟\n\nAyna mahatta al-amti'a?\n\nWhere is the baggage claim?`,
      };

      const tutorMessage = mockResponses[selectedScenario] || mockResponses.casual;
      
      setCharHistory(prev => [
        ...prev,
        { user: userMessage, tutor: tutorMessage, scenario: selectedScenario }
      ]);

      // Check for pronunciation errors (simple mock)
      const errors = [];
      if (userMessage.includes('q') && !userMessage.includes('ق')) {
        errors.push('Pronunciation tip: "ق" (Qaf) is pronounced from the back of the throat, deeper than "ك" (Kaf)');
      }
      if (errors.length > 0) {
        setCorrection(errors.join(' | '));
      }

      // Speak the response
      setTimeout(() => speak(tutorMessage.split('\n')[0]), 500);

      setTranscript('');
    } catch (error) {
      console.error('API Error:', error);
      alert('Error connecting to Claude API. Make sure your API key is set.');
    } finally {
      setLoading(false);
    }
  };

  const generateCustomDeck = async () => {
    if (!customTopic.trim()) return;
    
    try {
      setGeneratingDeck(true);
      
      // Mock generation - in production, call Claude API
      const mockDeck = [
        { arabic: 'سؤال', english: `Basic word about ${customTopic}`, pronunciation: 'Su\'al', learned: false },
        { arabic: 'جواب', english: `Another ${customTopic} word`, pronunciation: 'Jawab', learned: false },
        { arabic: 'معنى', english: `Third ${customTopic} term`, pronunciation: 'Ma\'na', learned: false },
        { arabic: 'درس', english: `Fourth ${customTopic} word`, pronunciation: 'Dars', learned: false },
        { arabic: 'كتاب', english: `Fifth ${customTopic} term`, pronunciation: 'Kitab', learned: false },
        { arabic: 'قراءة', english: `Sixth ${customTopic} word`, pronunciation: 'Qiraa\'a', learned: false },
        { arabic: 'كلمة', english: `Seventh ${customTopic} term`, pronunciation: 'Kalima', learned: false },
        { arabic: 'لغة', english: `Eighth ${customTopic} word`, pronunciation: 'Lugha', learned: false },
        { arabic: 'نطق', english: `Ninth ${customTopic} term`, pronunciation: 'Natq', learned: false },
        { arabic: 'تعلم', english: `Tenth ${customTopic} word`, pronunciation: 'Ta\'allum', learned: false },
      ];

      setCustomDeck(mockDeck);
      setVocabCards(mockDeck);
      setCurrentCardIndex(0);
      setIsFlipped(false);
      setCustomTopic('');
    } catch (error) {
      console.error('Error generating deck:', error);
      alert('Error generating custom deck');
    } finally {
      setGeneratingDeck(false);
    }
  };

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const markAsLearned = () => {
    const newCards = [...vocabCards];
    newCards[currentCardIndex].learned = !newCards[currentCardIndex].learned;
    setVocabCards(newCards);

    if (newCards[currentCardIndex].learned && wordsLearned < 100) {
      setWordsLearned(wordsLearned + 1);
      saveProgress(streak, wordsLearned + 1);
    }
  };

  const nextCard = () => {
    if (currentCardIndex < vocabCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleTranslate = async () => {
    if (!translationInput.trim()) return;

    try {
      setTranslationLoading(true);

      // Mock translation - in production, call Claude API
      const mockResult = {
        original: translationInput,
        translated: translationInput.includes('hello') 
          ? 'مرحبا' 
          : 'كلمة عربية',
        pronunciation: 'Marhaba',
        wordBreakdown: [
          { word: 'مرحبا', english: 'Hello', grammar: 'Noun - greeting' }
        ]
      };

      setTranslationResult(mockResult);
      
      // Speak the translation
      setTimeout(() => speak(mockResult.translated), 300);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setTranslationLoading(false);
    }
  };

  // Scenarios for chat
  const scenarios = [
    { id: 'casual', name: '👋 Casual Chat', description: 'Everyday conversation' },
    { id: 'coffee', name: '☕ Order Coffee', description: 'At a café' },
    { id: 'airport', name: '✈️ Airport', description: 'Travel scenario' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen size={32} />
              Arabic Tutor
            </h1>
            <p className="text-blue-100">Beginner Level</p>
          </div>
          <div className="flex gap-6 text-right">
            <div className="bg-blue-500 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold">🔥 {streak}</div>
              <div className="text-sm">Day Streak</div>
            </div>
            <div className="bg-blue-500 px-4 py-2 rounded-lg">
              <div className="text-2xl font-bold">📚 {wordsLearned}</div>
              <div className="text-sm">Words Learned</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto flex gap-2 p-4">
          {[
            { id: 'chat', label: '💬 Chat', icon: '🎙️' },
            { id: 'alphabet', label: '🔤 Alphabet', icon: '✍️' },
            { id: 'vocab', label: '📖 Vocab', icon: '📚' },
            { id: 'translate', label: '🔄 Translate', icon: '🌐' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsFlipped(false);
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        
        {/* CHAT TAB */}
        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Area */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Conversation</h2>
              
              {/* Scenario Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Choose Scenario:</label>
                <div className="flex gap-2 flex-wrap">
                  {scenarios.map(scenario => (
                    <button
                      key={scenario.id}
                      onClick={() => setSelectedScenario(scenario.id)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        selectedScenario === scenario.id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {scenario.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Messages */}
              <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-4 border-2 border-gray-200">
                {charHistory.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Start speaking to begin the conversation!</p>
                ) : (
                  charHistory.map((msg, idx) => (
                    <div key={idx} className="mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg mb-2">
                        <p className="font-semibold text-blue-900">You:</p>
                        <p className="text-blue-800">{msg.user}</p>
                      </div>
                      <div className="bg-indigo-100 p-3 rounded-lg">
                        <p className="font-semibold text-indigo-900">Tutor:</p>
                        {msg.tutor.split('\n').map((line, i) => (
                          <p key={i} className="text-indigo-800">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Correction Box */}
              {correction && (
                <div className="bg-orange-50 border-l-4 border-orange-400 p-3 mb-4 rounded">
                  <p className="text-sm font-semibold text-orange-800">💡 {correction}</p>
                </div>
              )}

              {/* Input Area */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="Speak or type in Arabic..."
                  className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-600"
                />
                <button
                  onClick={startListening}
                  disabled={isListening}
                  className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                    isListening
                      ? 'bg-red-600 text-white'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                  {isListening ? 'Listening...' : 'Speak'}
                </button>
                <button
                  onClick={() => callClaudeAPI(transcript || 'مرحبا')}
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
                >
                  {loading ? 'Responding...' : 'Send'}
                </button>
              </div>
            </div>

            {/* Right Sidebar - Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">📝 Quick Tips</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900">Speak Clearly</p>
                  <p className="text-xs text-blue-700">Enunciate vowels distinctly</p>
                </div>
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-indigo-900">Right to Left</p>
                  <p className="text-xs text-indigo-700">Arabic reads right to left</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-purple-900">Pronunciation</p>
                  <p className="text-xs text-purple-700">Listen to native speakers</p>
                </div>
                <div className="bg-pink-50 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-pink-900">Practice Daily</p>
                  <p className="text-xs text-pink-700">Build your streak!</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t-2">
                <h4 className="font-semibold mb-2">API Setup</h4>
                <input
                  type="password"
                  placeholder="Anthropic API Key (optional)"
                  onChange={(e) => apiKeyRef.current = e.target.value}
                  className="w-full border rounded px-3 py-2 text-sm mb-2"
                />
                <p className="text-xs text-gray-500">Using mock responses. Add your API key for real Claude responses.</p>
              </div>
            </div>
          </div>
        )}

        {/* ALPHABET TAB */}
        {activeTab === 'alphabet' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Arabic Alphabet</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {arabicAlphabet.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => speak(item.sound, 'ar-SA')}
                  className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-lg p-4 text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all"
                >
                  <div className="text-5xl mb-2">{item.letter}</div>
                  <div className="text-xs font-semibold text-gray-700 mb-1">{item.name}</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(item.sound, 'ar-SA');
                    }}
                    className="flex items-center justify-center gap-1 mx-auto text-blue-600 hover:text-blue-800 mt-2"
                  >
                    <Volume2 size={14} />
                    <span className="text-xs">{item.sound}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VOCAB TAB */}
        {activeTab === 'vocab' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Deck Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Preset Decks</h3>
              <div className="space-y-2 mb-6">
                {['greetings', 'food', 'travel', 'numbers'].map(deck => (
                  <button
                    key={deck}
                    onClick={() => {
                      setCurrentDeck(deck);
                      setVocabCards(decks[deck]);
                      setCurrentCardIndex(0);
                      setIsFlipped(false);
                      setCustomDeck([]);
                    }}
                    className={`w-full px-4 py-2 rounded-lg transition-all text-left font-semibold ${
                      currentDeck === deck && customDeck.length === 0
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {deck.charAt(0).toUpperCase() + deck.slice(1)} ({decks[deck].length})
                  </button>
                ))}
              </div>

              <h3 className="text-lg font-bold mb-3">Create Custom Deck</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="e.g., Animals, Sports, Family"
                  className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-600"
                />
                <button
                  onClick={generateCustomDeck}
                  disabled={generatingDeck}
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Plus size={16} />
                  {generatingDeck ? 'Generating...' : 'Generate Deck'}
                </button>
              </div>
            </div>

            {/* Flashcard */}
            <div className="lg:col-span-2">
              {vocabCards.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">
                      Card {currentCardIndex + 1} of {vocabCards.length}
                    </h3>
                    <div className="text-sm text-gray-600">
                      Learned: {vocabCards.filter(c => c.learned).length}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    onClick={handleCardFlip}
                    className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-xl shadow-2xl p-8 h-64 flex flex-col items-center justify-center cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105 mb-6"
                  >
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-4">
                        {isFlipped ? vocabCards[currentCardIndex].english : vocabCards[currentCardIndex].arabic}
                      </div>
                      <p className="text-lg opacity-90">
                        {isFlipped ? vocabCards[currentCardIndex].pronunciation : 'Click to reveal'}
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    <button
                      onClick={() => speak(vocabCards[currentCardIndex].arabic, 'ar-SA')}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <Volume2 size={18} />
                      Hear Word
                    </button>
                    <button
                      onClick={markAsLearned}
                      className={`flex-1 px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                        vocabCards[currentCardIndex].learned
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                      }`}
                    >
                      <Check size={18} />
                      {vocabCards[currentCardIndex].learned ? 'Learned' : 'Mark Learned'}
                    </button>
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-2">
                    <button
                      onClick={prevCard}
                      disabled={currentCardIndex === 0}
                      className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={nextCard}
                      disabled={currentCardIndex === vocabCards.length - 1}
                      className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TRANSLATE TAB */}
        {activeTab === 'translate' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Translator</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Input */}
              <div>
                <label className="block text-sm font-semibold mb-2">Enter English or Arabic:</label>
                <textarea
                  value={translationInput}
                  onChange={(e) => setTranslationInput(e.target.value)}
                  placeholder="Type a word, phrase, or sentence..."
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 h-24 focus:outline-none focus:border-indigo-600 font-lg"
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleTranslate}
                    disabled={translationLoading}
                    className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {translationLoading ? 'Translating...' : 'Translate'}
                  </button>
                  <button
                    onClick={() => speak(translationInput)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <Volume2 size={18} />
                    Hear It
                  </button>
                </div>
              </div>

              {/* Result */}
              {translationResult && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Translation:</label>
                  <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg px-4 py-3 h-24 flex flex-col justify-center">
                    <div className="text-2xl font-bold text-indigo-900 mb-2">{translationResult.translated}</div>
                    <p className="text-sm text-indigo-700">{translationResult.pronunciation}</p>
                  </div>
                  <button
                    onClick={() => speak(translationResult.translated, 'ar-SA')}
                    className="w-full mt-3 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <Volume2 size={18} />
                    Hear Translation
                  </button>
                </div>
              )}
            </div>

            {/* Word Breakdown */}
            {translationResult && (
              <div>
                <h3 className="text-lg font-bold mb-4">Word-by-Word Breakdown:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {translationResult.wordBreakdown.map((item, idx) => (
                    <div key={idx} className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                      <p className="font-bold text-blue-900">{item.word}</p>
                      <p className="text-sm text-blue-700">{item.english}</p>
                      <p className="text-xs text-blue-600 italic">{item.grammar}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-gray-400 p-6 mt-12 text-center text-sm">
        <p>🌍 Arabic Learning App | Beginner-Friendly | Practice Daily to Build Your Streak!</p>
      </div>
    </div>
  );
};

export default ArabicLearnerApp;
