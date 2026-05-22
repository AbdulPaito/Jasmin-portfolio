require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const About = require('../models/About');
const Settings = require('../models/Settings');
const Service = require('../models/Service');
const Skill = require('../models/Skill');
const Testimonial = require('../models/Testimonial');
const Blog = require('../models/Blog');

const seedData = async () => {
  try {
    await connectDB();
    console.log('🌱 Starting database seed...');

    // Clear existing data
    await User.deleteMany({});
    await About.deleteMany({});
    await Settings.deleteMany({});
    await Service.deleteMany({});
    await Skill.deleteMany({});
    await Testimonial.deleteMany({});
    await Blog.deleteMany({});

    // 1. Create admin user
    const admin = await User.create({
      name: 'Jasmin Paito',
      email: 'jasminpaito11@gmail.com',
      password: process.env.ADMIN_PASSWORD || 'ChangeThisNow!',
      role: 'admin',
    });
    console.log('✅ Admin user created');

    // 2. Seed Settings
    await Settings.create({
      heroTitle: 'Jasmin Paito',
      heroSubtitle: 'Accounting Assistant | Tax, Bookkeeping & Administrative Support',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/jasminpaito',
        twitter: '',
        facebook: '',
        instagram: '',
      },
      contactInfo: {
        email: 'jasminpaito11@gmail.com',
        phone: '403-671-9479',
        address: 'Calgary, SW',
        whatsapp: '4036719479',
        mapEmbedUrl: '',
      },
      siteTitle: 'Jasmin Paito | Accounting Professional',
      siteDescription: 'Professional Accounting Assistant specializing in tax preparation, bookkeeping, and financial consulting in Calgary, AB.',
    });
    console.log('✅ Settings created');

    // 3. Seed About
    await About.create({
      biography: 'Experienced Accounting Assistant with expertise in tax preparation, bookkeeping, accounts receivable, GST filings, and administrative support. Skilled in managing financial records, preparing T1 returns, supporting T2 corporate files, and handling communication for large client portfolios. Experienced with Sage, QuickBooks, Xero, TaxCycle, CaseWare, and Microsoft Excel in fast-paced accounting environments.',
      education: [
        { degree: 'Business Diploma in Accounting', institution: 'Red Deer Polytechnic, Red Deer, AB', year: '2026' },
      ],
      experience: [
        {
          title: 'Tax Associates / Client Liaison',
          company: 'CGL Tax, Red Deer, AB',
          duration: 'Jan 2025 – Apr 2026',
          description: 'Managed accounts receivable using Sage. Processed invoices, payments, and reconciliations. Prepared 150+ T1 personal tax returns. Supported GST filings and T2 corporate tax files. Managed communication and documentation for 350+ clients. Maintained audit-ready financial records. Recognized for strong performance and reliability.',
        },
        {
          title: 'Customer Support Specialist 4',
          company: 'Connext Global Solutions, Denver, CO (Remote)',
          duration: 'Mar 2023 – Mar 2024',
          description: 'Managed financial data entry with high accuracy. Supported accounts payable workflows. Prepared client financial reports. Improved reconciliation and validation processes. Reviewed invoices and financial transactions. Supported compliance and audit readiness.',
        },
      ],
      certifications: [],
      achievements: [
        { title: '150+ Tax Returns Prepared', description: 'Successfully prepared over 150 T1 personal tax returns during tax season with high accuracy.' },
        { title: '350+ Client Portfolio', description: 'Managed communication and documentation for a portfolio of over 350 clients.' },
        { title: 'Audit-Ready Records', description: 'Consistently maintained financial records that met audit-ready standards.' },
      ],
    });
    console.log('✅ About data created');

    // 4. Seed Services
    const services = [
      { title: 'Tax Preparation', description: 'Expert T1 personal and T2 corporate tax return preparation with thorough review and accuracy.', icon: 'FiFileText', order: 1 },
      { title: 'Bookkeeping', description: 'Comprehensive bookkeeping services including transaction recording, categorization, and financial organization.', icon: 'FiBook', order: 2 },
      { title: 'Accounts Receivable Management', description: 'Professional AR management including invoicing, payment tracking, and reconciliation.', icon: 'FiDollarSign', order: 3 },
      { title: 'GST Filing & Compliance', description: 'Accurate GST filing and compliance management for businesses of all sizes.', icon: 'FiClipboard', order: 4 },
      { title: 'Financial Reporting', description: 'Detailed financial reporting and analysis to support informed business decisions.', icon: 'FiBarChart2', order: 5 },
      { title: 'Payroll Services', description: 'Efficient payroll processing and management with compliance to regulatory requirements.', icon: 'FiUsers', order: 6 },
      { title: 'Audit Assistance', description: 'Thorough preparation of audit-ready financial documentation and records.', icon: 'FiSearch', order: 7 },
      { title: 'Administrative Support', description: 'Professional administrative support for accounting firms and financial departments.', icon: 'FiBriefcase', order: 8 },
    ];
    await Service.insertMany(services);
    console.log('✅ Services created');

    // 5. Seed Skills
    const skills = [
      { name: 'Accounts Receivable (AR)', percentage: 90, category: 'accounting' },
      { name: 'Accounts Payable (AP)', percentage: 85, category: 'accounting' },
      { name: 'General Ledger Support', percentage: 80, category: 'accounting' },
      { name: 'GST Filings', percentage: 92, category: 'accounting' },
      { name: 'Tax Preparation', percentage: 95, category: 'accounting' },
      { name: 'T1 Tax Preparation', percentage: 93, category: 'accounting' },
      { name: 'Bank Reconciliation', percentage: 88, category: 'accounting' },
      { name: 'Financial Reporting', percentage: 85, category: 'accounting' },
      { name: 'Client Communication', percentage: 90, category: 'communication' },
      { name: 'Payment Processing', percentage: 87, category: 'accounting' },
      { name: 'Document Management', percentage: 85, category: 'communication' },
      { name: 'Sage', percentage: 88, category: 'software' },
      { name: 'QuickBooks', percentage: 90, category: 'software' },
      { name: 'Xero', percentage: 82, category: 'software' },
      { name: 'TaxCycle', percentage: 92, category: 'software' },
      { name: 'ShareFile', percentage: 80, category: 'software' },
      { name: 'Microsoft Excel', percentage: 93, category: 'software' },
      { name: 'CaseWare', percentage: 78, category: 'software' },
    ];
    await Skill.insertMany(skills);
    console.log('✅ Skills created');

    // 6. Seed Testimonials
    const testimonials = [
      { clientName: 'Sarah Mitchell', company: 'Mitchell & Associates', feedback: 'Jasmin is incredibly thorough and reliable. Her attention to detail in preparing our tax returns has been invaluable to our firm.', rating: 5 },
      { clientName: 'David Chen', company: 'Chen Financial Group', feedback: 'Working with Jasmin has streamlined our bookkeeping processes. She is professional, organized, and always meets deadlines.', rating: 5 },
      { clientName: 'Rebecca Torres', company: 'Torres Consulting', feedback: "Jasmin's expertise in GST filings and accounts receivable has been a tremendous asset to our firm. Highly recommended.", rating: 5 },
    ];
    await Testimonial.insertMany(testimonials);
    console.log('✅ Testimonials created');

    // 7. Seed sample blogs
    const blogs = [
      {
        title: '5 Essential Tax Tips for Small Business Owners',
        content: '<p>As a small business owner, navigating the tax landscape can be overwhelming. Here are five essential tips to help you stay compliant and maximize your deductions.</p><h2>1. Keep Accurate Records</h2><p>Maintain organized financial records throughout the year. Use accounting software like QuickBooks or Sage to track income and expenses systematically.</p><h2>2. Understand Your Deductions</h2><p>Many business expenses are tax-deductible, including office supplies, business travel, and professional development costs. Make sure you\'re claiming everything you\'re entitled to.</p><h2>3. File on Time</h2><p>Late filing can result in penalties and interest charges. Mark important tax deadlines on your calendar and set reminders well in advance.</p><h2>4. Separate Personal and Business Finances</h2><p>Having separate bank accounts and credit cards for your business makes tracking expenses much easier and provides clearer records for tax purposes.</p><h2>5. Consult a Professional</h2><p>Working with an experienced accounting professional can help you identify opportunities for tax savings and ensure compliance with all regulations.</p>',
        excerpt: 'Navigate the tax landscape with confidence. Five essential tips to help small business owners stay compliant and maximize deductions.',
        tags: ['Tax Tips', 'Small Business', 'Tax Planning'],
        category: 'Tax Tips',
        author: admin._id,
        isPublished: true,
      },
      {
        title: 'The Importance of Regular Bank Reconciliation',
        content: '<p>Bank reconciliation is one of the most important accounting processes for any business. It ensures that your financial records are accurate and up-to-date.</p><h2>What is Bank Reconciliation?</h2><p>Bank reconciliation is the process of comparing your internal financial records against your bank statements to ensure they match. Any discrepancies should be investigated and resolved promptly.</p><h2>Why is it Important?</h2><p>Regular reconciliation helps detect errors, prevent fraud, maintain accurate cash flow information, and ensure your financial statements are reliable. It\'s a fundamental practice that every business should follow.</p><h2>Best Practices</h2><p>Reconcile your accounts at least monthly. Use accounting software to streamline the process. Document any adjustments made. Keep records of all reconciliation reports for audit purposes.</p>',
        excerpt: 'Learn why regular bank reconciliation is crucial for maintaining accurate financial records and preventing fraud.',
        tags: ['Bookkeeping', 'Bank Reconciliation', 'Financial Management'],
        category: 'Accounting Basics',
        author: admin._id,
        isPublished: true,
      },
      {
        title: 'Understanding GST Filing Requirements in Canada',
        content: '<p>The Goods and Services Tax (GST) is a federal tax that applies to most goods and services sold in Canada. Understanding your GST obligations is essential for business compliance.</p><h2>Who Needs to Register?</h2><p>If your business earns more than $30,000 in revenue over four consecutive calendar quarters, you must register for GST/HST. Even if you earn less, voluntary registration may be beneficial.</p><h2>Filing Deadlines</h2><p>GST filing deadlines depend on your reporting period. Annual filers typically have three months after their fiscal year-end. Quarterly and monthly filers have one month after the reporting period ends.</p><h2>Input Tax Credits</h2><p>You can claim Input Tax Credits (ITCs) to recover the GST you paid on business purchases. Keep all receipts and records to support your claims.</p>',
        excerpt: 'A comprehensive guide to understanding GST filing requirements and compliance for Canadian businesses.',
        tags: ['GST', 'Tax Compliance', 'Canadian Tax'],
        category: 'Tax Tips',
        author: admin._id,
        isPublished: true,
      },
    ];
    for (const blogData of blogs) {
      await Blog.create(blogData);
    }
    console.log('✅ Sample blogs created');

    console.log('\n🎉 Database seeded successfully!');
    console.log('📧 Admin login: jasminpaito11@gmail.com');
    console.log('🔑 Password: (check your environment variables)');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedData();
