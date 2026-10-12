'use server'

import { isValidObjectId } from 'mongoose'
import { dbconnect } from '@/lib/mongo'
import { authorizeAdminAction } from '@/lib/currentUser'
import Announcement from '@/models/Announcement'
import Faq from '@/models/Faq'

const MAX_LENGTH = 5000;

function cleanText(value) {
    return typeof value === 'string' ? value.trim().slice(0, MAX_LENGTH) : '';
}

function toAnnouncement(values) {
    const announcement = {
        title: cleanText(values?.title),
        description: cleanText(values?.description),
        type: cleanText(values?.type) || 'Update',
        isPublished: values?.isPublished === true,
    };
    if (!announcement.title || !announcement.description) {
        return { error: 'Title and description are required.' };
    }
    return { announcement };
}

export async function saveAnnouncement(id, values) {
    const { denied } = await authorizeAdminAction();
    if (denied) return denied;

    const { announcement, error } = toAnnouncement(values);
    if (error) return { success: false, message: error };

    await dbconnect();
    if (!id) {
        await Announcement.create(announcement);
        return { success: true };
    }
    if (!isValidObjectId(id)) return { success: false, message: 'Announcement not found.' };
    const result = await Announcement.updateOne({ _id: id }, { $set: announcement });
    if (!result.matchedCount) return { success: false, message: 'Announcement not found.' };
    return { success: true };
}

export async function deleteAnnouncement(id) {
    const { denied } = await authorizeAdminAction();
    if (denied) return denied;
    if (!isValidObjectId(id)) return { success: false, message: 'Announcement not found.' };

    await dbconnect();
    await Announcement.deleteOne({ _id: id });
    return { success: true };
}

export async function saveFaq(id, values) {
    const { denied } = await authorizeAdminAction();
    if (denied) return denied;

    const faq = { question: cleanText(values?.question), answer: cleanText(values?.answer) };
    if (!faq.question || !faq.answer) return { success: false, message: 'Question and answer are required.' };

    await dbconnect();
    if (!id) {
        const last = await Faq.findOne().sort({ order: -1 }).select('order').lean();
        await Faq.create({ ...faq, order: (last?.order ?? 0) + 1 });
        return { success: true };
    }
    if (!isValidObjectId(id)) return { success: false, message: 'Question not found.' };
    const result = await Faq.updateOne({ _id: id }, { $set: faq });
    if (!result.matchedCount) return { success: false, message: 'Question not found.' };
    return { success: true };
}

export async function deleteFaq(id) {
    const { denied } = await authorizeAdminAction();
    if (denied) return denied;
    if (!isValidObjectId(id)) return { success: false, message: 'Question not found.' };

    await dbconnect();
    await Faq.deleteOne({ _id: id });
    return { success: true };
}

export async function moveFaq(id, direction) {
    const { denied } = await authorizeAdminAction();
    if (denied) return denied;
    if (!isValidObjectId(id) || ![-1, 1].includes(direction)) return { success: false, message: 'Invalid move.' };

    await dbconnect();
    const faqs = await Faq.find().sort({ order: 1, createdAt: 1 }).select('_id').lean();
    const index = faqs.findIndex((f) => f._id.toString() === id);
    const target = index + direction;
    if (index === -1 || target < 0 || target >= faqs.length) return { success: true };

    [faqs[index], faqs[target]] = [faqs[target], faqs[index]];
    await Faq.bulkWrite(faqs.map((f, i) => ({
        updateOne: { filter: { _id: f._id }, update: { $set: { order: i + 1 } } },
    })));
    return { success: true };
}
