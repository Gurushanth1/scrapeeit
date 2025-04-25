import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function DELETE(req, context) {
    const { id } = context.params;

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('urls')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting URL:', error);
        return NextResponse.json({ error: 'Error deleting URL' }, { status: 500 });
    }

    return NextResponse.json({ message: 'URL deleted successfully' });
}
