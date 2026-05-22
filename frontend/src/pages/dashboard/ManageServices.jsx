import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import DashboardModal from '../../components/dashboard/DashboardModal';
import ConfirmDialog from '../../components/dashboard/ConfirmDialog';
import { getAllServices, createService, updateService, deleteService } from '../../services/serviceService';
import toast from 'react-hot-toast';

const emptyService = { title: '', description: '', icon: 'FiBriefcase', order: 0, isActive: true };

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyService);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = () => getAllServices().then(r => setServices(r.data)).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyService); setModalOpen(true); };
  const openEdit = (s) => { setEditing(s._id); setForm(s); setModalOpen(true); };
  const openDelete = (id) => { setDeleteId(id); setConfirmOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) { await updateService(editing, form); toast.success('Service updated!'); }
      else { await createService(form); toast.success('Service created!'); }
      setModalOpen(false);
      fetchData();
    } catch { toast.error('Failed to save'); }
    setSaving(false);
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await deleteService(deleteId);
      toast.success('Service deleted!');
      setConfirmOpen(false);
      fetchData();
    } catch { toast.error('Failed to delete'); }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-navy">Manage Services</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2"><FiPlus /> Add Service</button>
      </div>

      {loading ? <div className="flex justify-center py-20"><div className="loader-spinner" /></div> : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-light-gray border-b border-gray-100">
                <tr>
                  <th className="text-left p-4 font-semibold text-navy">Title</th>
                  <th className="text-left p-4 font-semibold text-navy hidden md:table-cell">Icon</th>
                  <th className="text-left p-4 font-semibold text-navy hidden md:table-cell">Order</th>
                  <th className="text-left p-4 font-semibold text-navy">Status</th>
                  <th className="text-right p-4 font-semibold text-navy">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map(s => (
                  <tr key={s._id} className="border-b border-gray-50 hover:bg-light-gray/50 transition-colors">
                    <td className="p-4 font-medium text-navy">{s.title}</td>
                    <td className="p-4 text-slate-custom hidden md:table-cell">{s.icon}</td>
                    <td className="p-4 text-slate-custom hidden md:table-cell">{s.order}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.isActive ? 'bg-emerald/10 text-emerald' : 'bg-gray-100 text-gray-500'}`}>
                        {s.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => openEdit(s)} className="p-2 text-royal hover:bg-royal/10 rounded-lg mr-1"><FiEdit2 size={16} /></button>
                      <button onClick={() => openDelete(s._id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><FiTrash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <DashboardModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Service' : 'Add Service'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Title</label>
            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Description</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Icon Name</label>
              <input value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none" placeholder="FiBriefcase" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Order</label>
              <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none" />
            </div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-emerald focus:ring-emerald" />
            <span className="text-sm font-medium text-navy">Active</span>
          </label>
          <button onClick={handleSave} disabled={saving} className="btn-primary w-full flex items-center justify-center gap-2">
            {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Save Service'}
          </button>
        </div>
      </DashboardModal>

      <ConfirmDialog isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleDelete} loading={saving} message="This will permanently delete this service." />
    </div>
  );
};

export default ManageServices;
