import { useState, useEffect } from 'react';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';

const defaultCourses = [
  { id: '1', title: 'Beginner English', description: 'Start your journey from zero. Build a strong foundation in grammar, vocabulary, and basic conversation.', price: '5000 DZD', tags: 'Level A1-A2, 3 Months' },
  { id: '2', title: 'Intermediate English', description: 'Take your English to the next level. Complex grammar, richer vocabulary, and fluid sentence structures.', price: '6000 DZD', tags: 'Level B1-B2, 3 Months' },
  { id: '3', title: 'Speaking Mastery', description: 'Intensive conversation classes designed to eliminate your fear of speaking and improve pronunciation.', price: '4500 DZD', tags: 'All Levels, Ongoing' },
];

export function CoursesAdmin() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'content', 'courses'), (docRef) => {
      if (docRef.exists()) {
        setCourses(docRef.data().items || []);
      } else {
        setCourses(defaultCourses);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'content', 'courses'), { items: courses });
      alert("تم حفظ التعديلات بنجاح!");
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء الحفظ");
    }
    setSaving(false);
  };

  const updateCourse = (index: number, field: string, value: string) => {
    const newCourses = [...courses];
    newCourses[index] = { ...newCourses[index], [field]: value };
    setCourses(newCourses);
  };

  const addCourse = () => {
    setCourses([...courses, { id: Date.now().toString(), title: 'دورة جديدة', description: 'وصف الدورة', price: '0 DZD', tags: '' }]);
  };

  const removeCourse = (index: number) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };

  if (loading) return <div className="text-center py-12 text-white/50">جاري التحميل...</div>;

  return (
    <div className="glass-panel p-6 md:p-8 rounded-3xl" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-medium mb-2">تعديل الدورات والأسعار</h2>
          <p className="text-white/50 text-sm">ستظهر هذه التعديلات مباشرة في قسم الدورات في الموقع.</p>
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

      <div className="space-y-6">
        {courses.map((course, index) => (
          <div key={course.id || index} className="p-6 border border-white/10 rounded-2xl bg-white/[0.02] flex flex-col gap-4">
             <div className="flex justify-between items-start">
               <div className="flex items-center gap-3">
                 <GripVertical className="text-white/20 w-5 h-5" />
                 <h3 className="font-medium">دورة #{index + 1}</h3>
               </div>
               <button onClick={() => removeCourse(index)} className="text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
               </button>
             </div>
             
             <div className="grid md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs text-white/50 mb-1">اسم الدورة</label>
                  <input type="text" value={course.title} onChange={(e) => updateCourse(index, 'title', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-white/30 outline-none" dir="auto" />
               </div>
               <div>
                  <label className="block text-xs text-white/50 mb-1">السعر (مثال: 5000 DZD)</label>
                  <input type="text" value={course.price || ''} onChange={(e) => updateCourse(index, 'price', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-white/30 outline-none" dir="auto" />
               </div>
               <div className="md:col-span-2">
                  <label className="block text-xs text-white/50 mb-1">وصف الدورة</label>
                  <textarea value={course.description} onChange={(e) => updateCourse(index, 'description', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-white/30 outline-none h-20" dir="auto" />
               </div>
               <div className="md:col-span-2">
                  <label className="block text-xs text-white/50 mb-1">الوسوم (مفصولة بفاصلة)</label>
                  <input type="text" value={course.tags} onChange={(e) => updateCourse(index, 'tags', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-white/30 outline-none" dir="auto" placeholder="مثال: Intensive, 3 Months" />
               </div>
             </div>
          </div>
        ))}
      </div>

      <button onClick={addCourse} className="w-full mt-6 py-4 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-white/50 hover:text-white/80 hover:bg-white/5 transition-colors">
        <Plus className="w-5 h-5" /> إضافة دورة جديدة
      </button>

    </div>
  );
}
