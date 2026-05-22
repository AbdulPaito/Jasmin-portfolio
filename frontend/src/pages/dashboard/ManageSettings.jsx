import { useState, useEffect } from 'react';
import { FiSave } from 'react-icons/fi';
import ImageUpload from '../../components/dashboard/ImageUpload';
import { getSettings, updateSettings } from '../../services/settingsService';
import toast from 'react-hot-toast';

const ManageSettings = () => {
  const [form, setForm] = useState({
    heroTitle: '', heroSubtitle: '', profileImage: '', resumeUrl: '', siteTitle: '', siteDescription: '',
    socialLinks: { linkedin: '', twitter: '', facebook: '', instagram: '' },
    contactInfo: { email: '', phone: '', address: '', whatsapp: '', mapEmbedUrl: '' },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings().then(r => setForm(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try { await updateSettings(form); toast.success('Settings saved!'); }
    catch { toast.error('Failed to save'); }
    setSaving(false);
  };

  const updateSocial = (key, value) => setForm({ ...form, socialLinks: { ...form.socialLinks, [key]: value } });
  const updateContact = (key, value) => setForm({ ...form, contactInfo: { ...form.contactInfo, [key]: value } });

  if (loading) return <div className="flex justify-center py-20"><div className="loader-spinner" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-navy">Site Settings</h1>
        <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
          {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FiSave />} Save Settings
        </button>
      </div>

      <div className="space-y-8">
        {/* Hero Settings */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-navy mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Hero Title</label>
              <input value={form.heroTitle || ''} onChange={e => setForm({...form, heroTitle: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Hero Subtitle</label>
              <input value={form.heroSubtitle || ''} onChange={e => setForm({...form, heroSubtitle: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none" />
            </div>
            <ImageUpload currentImage={form.profileImage} onUpload={(url) => setForm({...form, profileImage: url})} label="Profile Image" hint="Recommended: Square or Portrait (e.g. 800x800px)" />
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-navy mb-4">Social Links</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(form.socialLinks || {}).map(([key, val]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-navy mb-1 capitalize">{key}</label>
                <input value={val || ''} onChange={e => updateSocial(key, e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none" placeholder={`https://${key}.com/...`} />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-navy mb-4">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Email</label>
              <input value={form.contactInfo?.email || ''} onChange={e => updateContact('email', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Phone</label>
              <input value={form.contactInfo?.phone || ''} onChange={e => updateContact('phone', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Address</label>
              <input value={form.contactInfo?.address || ''} onChange={e => updateContact('address', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">WhatsApp Number</label>
              <input value={form.contactInfo?.whatsapp || ''} onChange={e => updateContact('whatsapp', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-navy mb-1">Google Maps Embed URL</label>
              <input value={form.contactInfo?.mapEmbedUrl || ''} onChange={e => updateContact('mapEmbedUrl', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none" placeholder="https://maps.google.com/..." />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-navy mb-4">SEO Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Site Title</label>
              <input value={form.siteTitle || ''} onChange={e => setForm({...form, siteTitle: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Site Description</label>
              <textarea value={form.siteDescription || ''} onChange={e => setForm({...form, siteDescription: e.target.value})} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald outline-none resize-none" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageSettings;
