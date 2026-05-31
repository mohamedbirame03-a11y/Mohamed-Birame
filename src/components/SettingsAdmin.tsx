import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Save, ToggleLeft, ToggleRight, LayoutTemplate } from 'lucide-react';

const defaultSettings = {
  showAbout: true,
  showCourses: true,
  showWhyUs: true,
  showTestimonials: true,
  showInstagram: true,
  showStats: true,
  showFAQ: true,
  showResources: true
};

export function SettingsAdmin() {
  const [settings, setSettings] = useState<any>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'content', 'settings'), (docRef) => {
      if (docRef.exists()) {
        setSettings({ ...defaultSettings, ...docRef.data() });
      } else {
        setSettings(defaultSettings);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'content', 'settings'), settings);
      alert("تم حفظ الإعدادات بنجاح!");
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء الحفظ");
    }
    setSaving(false);
  };

  const toggleSetting = (key: string) => {
    setSettings((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) return <div className="text-center py-12 text-white/50">جاري التحميل...</div>;

  const sections = [
    { key: 'showAbout', title: 'قسم من نحن (About Me)' },
    { key: 'showCourses', title: 'قسم الدورات (Courses)' },
    { key: 'showResources', title: 'قسم المصادر والملفات (Resources)' },
    { key: 'showWhyUs', title: 'قسم لماذا تختارنا (Why Us)' },
    { key: 'showTestimonials', title: 'قسم آراء الطلاب (Testimonials)' },
    { key: 'showInstagram', title: 'قسم انستغرام (Instagram)' },
    { key: 'showStats', title: 'الإحصائيات (Stats)' },
    { key: 'showFAQ', title: 'الأسئلة الشائعة (FAQ)' }
  ];

  return (
    <div className="glass-panel p-6 md:p-8 rounded-3xl" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-medium mb-2">إخفاء وإظهار أقسام الموقع</h2>
          <p className="text-white/50 text-sm">يمكنك تفعيل أو إلغاء تفعيل أي قسم في الموقع بنقرة واحدة.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-white text-brand-950 px-6 py-3 rounded-xl font-medium transition-transform active:scale-95 disabled:opacity-70"
        >
          <Save className="w-5 h-5" />
          {saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <div key={section.key} className="flex items-center justify-between p-4 border border-white/10 rounded-2xl bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <LayoutTemplate className="w-5 h-5 text-white/50" />
              <span className="font-medium text-white/80">{section.title}</span>
            </div>
            <button 
                onClick={() => toggleSetting(section.key)}
                className={`transition-colors ${settings[section.key] ? 'text-green-400' : 'text-white/30'}`}
            >
                {settings[section.key] ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
