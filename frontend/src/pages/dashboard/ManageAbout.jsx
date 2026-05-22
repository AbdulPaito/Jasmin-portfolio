import { useState, useEffect } from 'react';
import { FiSave, FiPlus, FiTrash2 } from 'react-icons/fi';
import ImageUpload from '../../components/dashboard/ImageUpload';
import { getAbout, updateAbout } from '../../services/aboutService';
import toast from 'react-hot-toast';

const ManageAbout = () => {
  const [form, setForm] = useState({ biography: '', education: [], experience: [], certifications: [], achievements: [], resumeUrl: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAbout().then(r => setForm(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateAbout(form);
      toast.success('About info updated!');
    } catch { toast.error('Failed to save'); }
    setSaving(false);
  };

  const addItem = (field, template) => setForm({ ...form, [field]: [...form[field], template] });
  const removeItem = (field, index) => setForm({ ...form, [field]: form[field].filter((_, i) => i !== index) });
  const updateItem = (field, index, key, value) => {
    const items = [...form[field]];
    items[index] = { ...items[index], [key]: value };
    setForm({ ...form, [field]: items });
  };

  if (loading) return <div className="flex justify-center py-20"><div className="loader-spinner" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-navy">Manage About</h1>
        <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
          {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FiSave />} Save Changes
        </button>
      </div>

      <div className="space-y-8">
        {/* Biography */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-navy mb-4">Biography</h2>
          <textarea value={form.biography || ''} onChange={e => setForm({...form, biography: e.target.value})} rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none transition-all resize-none" placeholder="Professional biography..." />
        </div>

        {/* Education */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-navy">Education</h2>
            <button onClick={() => addItem('education', { degree: '', institution: '', year: '' })} className="text-emerald text-sm font-medium flex items-center gap-1 hover:underline"><FiPlus /> Add</button>
          </div>
          {form.education?.map((edu, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 p-4 bg-light-gray rounded-xl relative">
              <input value={edu.degree} onChange={e => updateItem('education', i, 'degree', e.target.value)} placeholder="Degree" className="px-3 py-2.5 rounded-lg border border-gray-200 focus:border-emerald outline-none text-sm" />
              <input value={edu.institution} onChange={e => updateItem('education', i, 'institution', e.target.value)} placeholder="Institution" className="px-3 py-2.5 rounded-lg border border-gray-200 focus:border-emerald outline-none text-sm" />
              <div className="flex gap-2">
                <input value={edu.year} onChange={e => updateItem('education', i, 'year', e.target.value)} placeholder="Year" className="flex-1 px-3 py-2.5 rounded-lg border border-gray-200 focus:border-emerald outline-none text-sm" />
                <button onClick={() => removeItem('education', i)} className="text-red-400 hover:text-red-600 p-2"><FiTrash2 /></button>
              </div>
            </div>
          ))}
        </div>

        {/* Experience */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-navy">Experience</h2>
            <button onClick={() => addItem('experience', { title: '', company: '', duration: '', description: '' })} className="text-emerald text-sm font-medium flex items-center gap-1 hover:underline"><FiPlus /> Add</button>
          </div>
          {form.experience?.map((exp, i) => (
            <div key={i} className="mb-4 p-4 bg-light-gray rounded-xl space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input value={exp.title} onChange={e => updateItem('experience', i, 'title', e.target.value)} placeholder="Job Title" className="px-3 py-2.5 rounded-lg border border-gray-200 focus:border-emerald outline-none text-sm" />
                <input value={exp.company} onChange={e => updateItem('experience', i, 'company', e.target.value)} placeholder="Company" className="px-3 py-2.5 rounded-lg border border-gray-200 focus:border-emerald outline-none text-sm" />
                <div className="flex gap-2">
                  <input value={exp.duration} onChange={e => updateItem('experience', i, 'duration', e.target.value)} placeholder="Duration" className="flex-1 px-3 py-2.5 rounded-lg border border-gray-200 focus:border-emerald outline-none text-sm" />
                  <button onClick={() => removeItem('experience', i)} className="text-red-400 hover:text-red-600 p-2"><FiTrash2 /></button>
                </div>
              </div>
              <textarea value={exp.description} onChange={e => updateItem('experience', i, 'description', e.target.value)} placeholder="Description" rows={3} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-emerald outline-none text-sm resize-none" />
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-navy">Achievements</h2>
            <button onClick={() => addItem('achievements', { title: '', description: '' })} className="text-emerald text-sm font-medium flex items-center gap-1 hover:underline"><FiPlus /> Add</button>
          </div>
          {form.achievements?.map((a, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 p-4 bg-light-gray rounded-xl">
              <input value={a.title} onChange={e => updateItem('achievements', i, 'title', e.target.value)} placeholder="Title" className="px-3 py-2.5 rounded-lg border border-gray-200 focus:border-emerald outline-none text-sm" />
              <div className="flex gap-2">
                <input value={a.description} onChange={e => updateItem('achievements', i, 'description', e.target.value)} placeholder="Description" className="flex-1 px-3 py-2.5 rounded-lg border border-gray-200 focus:border-emerald outline-none text-sm" />
                <button onClick={() => removeItem('achievements', i)} className="text-red-400 hover:text-red-600 p-2"><FiTrash2 /></button>
              </div>
            </div>
          ))}
        </div>

        {/* Resume Upload */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-navy mb-4">Resume / CV</h2>
          <ImageUpload currentImage={form.resumeUrl} onUpload={(url) => setForm({...form, resumeUrl: url})} label="Upload Resume (PDF or Image)" />
        </div>
      </div>
    </div>
  );
};

export default ManageAbout;
