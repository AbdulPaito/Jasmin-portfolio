import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import DashboardModal from '../../components/dashboard/DashboardModal';
import ConfirmDialog from '../../components/dashboard/ConfirmDialog';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../../services/skillService';
import toast from 'react-hot-toast';

const emptySkill = { name: '', percentage: 50, category: 'accounting', icon: '' };

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptySkill);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchData = () => getSkills().then(r => setSkills(r.data)).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptySkill); setModalOpen(true); };
  const openEdit = (s) => { setEditing(s._id); setForm(s); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) { await updateSkill(editing, form); toast.success('Skill updated!'); }
      else { await createSkill(form); toast.success('Skill created!'); }
      setModalOpen(false); fetchData();
    } catch { toast.error('Failed to save'); }
    setSaving(false);
  };

  const handleDelete = async () => {
    setSaving(true);
    try { await deleteSkill(deleteId); toast.success('Skill deleted!'); setConfirmOpen(false); fetchData(); }
    catch { toast.error('Failed to delete'); }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-navy">Manage Skills</h1>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2"><FiPlus /> Add Skill</button>
      </div>

      {loading ? <div className="flex justify-center py-20"><div className="loader-spinner" /></div> : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-light-gray border-b border-gray-100">
                <tr>
                  <th className="text-left p-4 font-semibold text-navy">Name</th>
                  <th className="text-left p-4 font-semibold text-navy">Category</th>
                  <th className="text-left p-4 font-semibold text-navy">Proficiency</th>
                  <th className="text-right p-4 font-semibold text-navy">Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map(s => (
                  <tr key={s._id} className="border-b border-gray-50 hover:bg-light-gray/50">
                    <td className="p-4 font-medium text-navy">{s.name}</td>
                    <td className="p-4"><span className="bg-emerald/10 text-emerald text-xs font-medium px-2.5 py-1 rounded-full capitalize">{s.category}</span></td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-gray-100 rounded-full h-2"><div className="h-full bg-emerald rounded-full" style={{ width: `${s.percentage}%` }} /></div>
                        <span className="text-sm font-medium text-navy">{s.percentage}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => openEdit(s)} className="p-2 text-royal hover:bg-royal/10 rounded-lg mr-1"><FiEdit2 size={16} /></button>
                      <button onClick={() => { setDeleteId(s._id); setConfirmOpen(true); }} className="p-2 text-red-400 hover:bg-red-50 rounded-lg"><FiTrash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <DashboardModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Skill' : 'Add Skill'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Skill Name</label>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Category</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none">
              <option value="accounting">Accounting</option>
              <option value="software">Software</option>
              <option value="analysis">Analysis</option>
              <option value="communication">Communication</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1">Proficiency: {form.percentage}%</label>
            <input type="range" min="0" max="100" value={form.percentage} onChange={e => setForm({...form, percentage: parseInt(e.target.value)})} className="w-full accent-emerald" />
            <div className="w-full bg-gray-100 rounded-full h-3 mt-2"><div className="h-full bg-gradient-to-r from-emerald to-emerald-light rounded-full transition-all" style={{ width: `${form.percentage}%` }} /></div>
          </div>
          <button onClick={handleSave} disabled={saving} className="btn-primary w-full flex items-center justify-center gap-2">
            {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Save Skill'}
          </button>
        </div>
      </DashboardModal>

      <ConfirmDialog isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleDelete} loading={saving} />
    </div>
  );
};

export default ManageSkills;
