import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiStar } from 'react-icons/fi';
import DashboardModal from '../../components/dashboard/DashboardModal';
import ConfirmDialog from '../../components/dashboard/ConfirmDialog';
import ImageUpload from '../../components/dashboard/ImageUpload';
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../services/testimonialService';
import toast from 'react-hot-toast';

const emptyForm = { clientName: '', company: '', feedback: '', rating: 5, image: '', isActive: true };

const ManageTestimonials = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = () => getAllTestimonials().then(r => setItems(r.data)).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (t) => { setEditing(t._id); setForm(t); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) { await updateTestimonial(editing, form); toast.success('Testimonial updated!'); }
      else { await createTestimonial(form); toast.success('Testimonial created!'); }
      setModalOpen(false); fetchData();
    } catch { toast.error('Failed to save'); }
    setSaving(false);
  };

  const handleDelete = async () => {
    setSaving(true);
    try { await deleteTestimonial(deleteId); toast.success('Testimonial deleted!'); setConfirmOpen(false); fetchData(); }
    catch { toast.error('Failed to delete'); }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-navy">Manage Testimonials</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2"><FiPlus /> Add Testimonial</button>
      </div>

      {loading ? <div className="flex justify-center py-20"><div className="loader-spinner" /></div> : (
        <div className="grid md:grid-cols-2 gap-6">
          {items.map(t => (
            <div key={t._id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {t.image ? <img src={t.image} alt={t.clientName} className="w-12 h-12 rounded-full object-cover" /> : <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center text-emerald font-bold">{t.clientName?.charAt(0)}</div>}
                  <div>
                    <h3 className="font-semibold text-navy">{t.clientName}</h3>
                    <p className="text-sm text-slate-custom">{t.company}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(t)} className="p-2 text-royal hover:bg-royal/10 rounded-lg"><FiEdit2 size={14} /></button>
                  <button onClick={() => { setDeleteId(t._id); setConfirmOpen(true); }} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><FiTrash2 size={14} /></button>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map(i => <FiStar key={i} size={14} className={i <= t.rating ? 'text-gold fill-gold' : 'text-gray-300'} />)}
              </div>
              <p className="text-slate-custom text-sm italic">"{t.feedback}"</p>
              <span className={`inline-block mt-3 px-2.5 py-1 rounded-full text-xs font-medium ${t.isActive ? 'bg-emerald/10 text-emerald' : 'bg-gray-100 text-gray-500'}`}>
                {t.isActive ? 'Active' : 'Hidden'}
              </span>
            </div>
          ))}
        </div>
      )}

      <DashboardModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Client Name</label>
              <input value={form.clientName} onChange={e => setForm({...form, clientName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Company</label>
              <input value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Feedback</label>
            <textarea value={form.feedback} onChange={e => setForm({...form, feedback: e.target.value})} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Rating</label>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(i => (
                <button key={i} type="button" onClick={() => setForm({...form, rating: i})} className={`p-2 rounded-lg transition-colors ${i <= form.rating ? 'text-gold' : 'text-gray-300'}`}>
                  <FiStar size={24} className={i <= form.rating ? 'fill-gold' : ''} />
                </button>
              ))}
            </div>
          </div>
          <ImageUpload currentImage={form.image} onUpload={(url) => setForm({...form, image: url})} label="Client Photo" />
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-emerald focus:ring-emerald" />
            <span className="text-sm font-medium text-navy">Active (visible on site)</span>
          </label>
          <button onClick={handleSave} disabled={saving} className="btn-primary w-full flex items-center justify-center gap-2">
            {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Save Testimonial'}
          </button>
        </div>
      </DashboardModal>

      <ConfirmDialog isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleDelete} loading={saving} />
    </div>
  );
};

export default ManageTestimonials;
