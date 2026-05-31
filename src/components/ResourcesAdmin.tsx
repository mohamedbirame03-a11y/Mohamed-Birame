import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Save, Plus, Trash2, Link } from 'lucide-react';

export function ResourcesAdmin() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'content', 'resources'), (docRef) => {
      if (docRef.exists()) {
        setResources(docRef.data().items || []);
      } else {
        setResources([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'content', 'resources'), { items: resources });
      alert("تم حفظ التعديلات بنجاح!");
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء الحفظ");
    }
    setSaving(false);
  };

  const updateResource = (index: number, field: string, value: string) => {
    const newResources = [...resources];
    newResources[index] = { ...newResources[index], [field]: value };
    setResources(newResources);
  };

  const addResource = () => {
    setResources([...resources, { id: Date.now().toString(), title: 'ملف جديد', url: '', description: '' }]);
  };

  const removeResource = (index: number) => {
    const newResources = resources.filter((_, i) => i !== index);
    setResources(newResources);
  };

  if (loading) return <div className="text-center py-12 text-white/50">جاري التحميل...</div>;

  return (
    <div className="glass-panel p-6 md:p-8 rounded-3xl" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-medium mb-2">إدارة الملفات والمصادر (PDF)</h2>
          <p className="text-white/50 text-sm">يمكنك إضافة روابط لملفات Google Drive أو أي روابط لتحميل الملفات.</p>
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
        {resources.length === 0 && (
            <div className="text-center py-12 text-white/50 border border-white/10 rounded-2xl bg-white/[0.02] border-dashed">
                لم يتم إضافة أي ملفات بعد. انقري على إضافة ملف جديد.
            </div>
        )}
        {resources.map((resource, index) => (
          <div key={resource.id || index} className="p-6 border border-white/10 rounded-2xl bg-white/[0.02] flex flex-col gap-4">
             <div className="flex justify-between items-start">
               <div className="flex items-center gap-3">
                 <Link className="text-white/50 w-5 h-5" />
                 <h3 className="font-medium">الملف #{index + 1}</h3>
               </div>
               <button onClick={() => removeResource(index)} className="text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
               </button>
             </div>
             
             <div className="grid md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs text-white/50 mb-1">اسم الملف / العنوان</label>
                  <input type="text" value={resource.title || ''} onChange={(e) => updateResource(index, 'title', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-white/30 outline-none" dir="auto" placeholder="مثال: كتاب القواعد الأساسية" />
               </div>
               <div>
                  <label className="block text-xs text-white/50 mb-1">رابط الملف (مثال: رابط جوجل درايف)</label>
                  <input type="url" value={resource.url || ''} onChange={(e) => updateResource(index, 'url', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-white/30 outline-none flex-row-reverse" dir="ltr" placeholder="https://..." />
               </div>
               <div className="md:col-span-2">
                  <label className="block text-xs text-white/50 mb-1">وصف قصير (اختياري)</label>
                  <input type="text" value={resource.description || ''} onChange={(e) => updateResource(index, 'description', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-white/30 outline-none" dir="auto" />
               </div>
             </div>
          </div>
        ))}
      </div>

      <button onClick={addResource} className="w-full mt-6 py-4 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-white/50 hover:text-white/80 hover:bg-white/5 transition-colors">
        <Plus className="w-5 h-5" /> إضافة ملف جديد
      </button>

    </div>
  );
}
