import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { LogIn, LogOut, Users, CheckCircle, Clock, Trash2, PhoneForwarded, Eye, Settings, FileEdit, FolderOpen, SlidersHorizontal } from 'lucide-react';
import { CoursesAdmin } from './CoursesAdmin';
import { ResourcesAdmin } from './ResourcesAdmin';
import { SettingsAdmin } from './SettingsAdmin';

export function AdminDashboard() {
  const [user, setUser] = useState(auth.currentUser);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState(0);
  const [activeTab, setActiveTab] = useState<'registrations' | 'content' | 'resources' | 'settings'>('registrations');

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (u) {
        const q = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'));
        const unsubscribeDb = onSnapshot(q, (snapshot) => {
          setRegistrations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          setLoading(false);
        }, (error) => {
           console.error("Error fetching registrations:", error);
           setLoading(false);
        });
        
        // Fetch visits
        const unsubscribeVisits = onSnapshot(doc(db, 'analytics', 'visits'), (doc) => {
          if (doc.exists()) {
            setVisits(doc.data().count || 0);
          }
        });

        return () => {
          unsubscribeDb();
          unsubscribeVisits();
        }
      } else {
        setRegistrations([]);
        setLoading(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'contacted' ? 'pending' : 'contacted';
      await updateDoc(doc(db, 'registrations', id), {
        status: newStatus
      });
    } catch (error) {
      console.error("Error updating status:", error);
      alert("حدث خطأ أثناء تحديث الحالة.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا التسجيل نهائياً؟')) {
      try {
        await deleteDoc(doc(db, 'registrations', id));
      } catch (error) {
        console.error("Error deleting record:", error);
        alert("حدث خطأ أثناء محاولة الحذف.");
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-brand-950 text-white flex items-center justify-center p-6">
        <div className="glass-panel p-8 md:p-12 rounded-3xl text-center max-w-md w-full border border-white/10">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-white/70" />
          </div>
          <h1 className="text-2xl font-display font-medium mb-2">لوحة تحكم المديرة</h1>
          <p className="text-white/50 text-sm mb-8">يرجى تسجيل الدخول بحساب المديرة للوصول إلى بيانات المسجلين</p>
          <button onClick={login} className="w-full flex items-center justify-center gap-3 bg-white text-brand-950 px-6 py-4 rounded-xl font-medium transition-transform active:scale-95">
            <LogIn className="w-5 h-5" /> الدخول باستخدام Google
          </button>
        </div>
      </div>
    );
  }

  const pendingCount = registrations.filter(r => r.status !== 'contacted').length;

  return (
    <div className="min-h-screen bg-brand-950 text-white p-6 pb-24" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8 border-b border-white/10 pb-6">
          <h1 className="text-2xl md:text-3xl font-display font-medium flex items-center gap-3">
            <Settings className="w-7 h-7 text-white/50" />
            لوحة تحكم المديرة (EDUXMINA)
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-sm hidden sm:block" dir="ltr">{user.email}</span>
            <button onClick={() => signOut(auth)} className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 text-sm transition-colors">
              <LogOut className="w-4 h-4" /> خروج
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-panel p-6 rounded-2xl">
            <div className="text-white/50 text-sm mb-2">إجمالي المسجلين</div>
            <div className="text-4xl font-display font-medium">{registrations.length}</div>
          </div>
          <div className="glass-panel p-6 rounded-2xl bg-gradient-to-br from-brand-900 to-brand-950 border border-brand-800">
            <div className="text-white/50 text-sm mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              في الانتظار
            </div>
            <div className="text-4xl font-display font-medium text-orange-400">{pendingCount}</div>
          </div>
          <div className="glass-panel p-6 rounded-2xl md:col-span-1 col-span-2">
            <div className="text-white/50 text-sm mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-brand-400" />
              زيارات الموقع
            </div>
            <div className="text-4xl font-display font-medium text-white">{visits}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10 overflow-x-auto pb-1 scrollbar-hide">
          <button 
            onClick={() => setActiveTab('registrations')}
            className={`pb-4 px-2 whitespace-nowrap text-sm md:text-base font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'registrations' ? 'border-white text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
          >
            <Users className="w-5 h-5" />
            طلبات التسجيل
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`pb-4 px-2 whitespace-nowrap text-sm md:text-base font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'content' ? 'border-white text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
          >
            <FileEdit className="w-5 h-5" />
            تعديل الدورات والأسعار
          </button>
          <button 
            onClick={() => setActiveTab('resources')}
            className={`pb-4 px-2 whitespace-nowrap text-sm md:text-base font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'resources' ? 'border-white text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
          >
            <FolderOpen className="w-5 h-5" />
            ملفات PDF ومصادر
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`pb-4 px-2 whitespace-nowrap text-sm md:text-base font-medium flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'settings' ? 'border-white text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            إدارة أقسام الموقع (إخفاء/إظهار)
          </button>
        </div>

        {activeTab === 'content' ? (
          <CoursesAdmin />
        ) : activeTab === 'resources' ? (
          <ResourcesAdmin />
        ) : activeTab === 'settings' ? (
          <SettingsAdmin />
        ) : (
          <>
            <h2 className="text-xl font-medium mb-6">قائمة المسجلين الجدد</h2>
            {loading ? (
              <div className="text-center text-white/50 py-12">جاري تحميل البيانات...</div>
            ) : registrations.length === 0 ? (
              <div className="text-center text-white/50 py-12 glass-panel rounded-2xl border-dashed">
                لا يوجد أي مسجلين حتى الآن، سيظهر الطلاب هنا فور تسجيلهم.
              </div>
            ) : (
              <div className="grid gap-4">
                {registrations.map((reg) => {
                  const phoneLink = reg.phone ? reg.phone.replace(/[^0-9+]/g, '') : '';
                  const isContacted = reg.status === 'contacted';
                  
                  return (
                  <div key={reg.id} className={`glass-panel p-5 rounded-2xl flex flex-col md:flex-row gap-6 justify-between md:items-center transition-colors ${isContacted ? 'opacity-60 border-white/5 bg-black/20' : 'border-white/10'}`}>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium" dir="ltr">{reg.firstName} {reg.lastName}</h3>
                        {isContacted ? (
                          <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> تم التواصل
                          </span>
                        ) : (
                          <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" /> بانتظار الرد
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-3">
                        <div className="text-white/60">الدورة المختارة: <br/><span className="text-white font-medium">{reg.course}</span></div>
                        <div className="text-white/60 text-right sm:text-left">
                          رقم الواتسآب: <br/>
                          <a href={`https://wa.me/${phoneLink}`} target="_blank" rel="noreferrer" className="text-green-400 hover:text-green-300 transition-colors font-medium inline-flex items-center gap-1 mt-1" dir="ltr">
                            <PhoneForwarded className="w-3 h-3" /> {reg.phone}
                          </a>
                        </div>
                      </div>
                      <div className="text-white/30 text-xs mt-4" dir="ltr">
                        {reg.createdAt?.toDate?.().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row md:flex-col gap-2 pt-4 md:pt-0 border-t border-white/5 md:border-none">
                      <button 
                        onClick={() => toggleStatus(reg.id, reg.status)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${isContacted ? 'border-white/10 hover:bg-white/5 text-white/70' : 'border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20'}`}
                      >
                        {isContacted ? 'إلغاء وضع "تم التواصل"' : 'تحديد كـ "تم التواصل"'}
                      </button>
                      <button 
                        onClick={() => handleDelete(reg.id)}
                        className="flex items-center justify-center p-2 rounded-lg text-red-400/70 hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/20 transition-colors"
                        title="حذف التسجيل"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )})}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
