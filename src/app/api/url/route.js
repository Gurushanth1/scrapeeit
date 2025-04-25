import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { url } = await req.json();
        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }
        // check if it is already in the database
        const { data: existingUrls, error: fetchError } = await supabase
            .from('urls')
            .select('*')
            .eq('url', url);
            console.log('Existing URLs:', existingUrls);
        if (fetchError) {
            return NextResponse.json({ error: 'Error fetching URLs' }, { status: 500 });
        }
        if (existingUrls.length > 0) {
            return NextResponse.json({ message: 'URL already exists' }, { status: 409 });
        }
        // insert the new URL
        const data = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + process.env.GEMINI_API_KEY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: '{           \n  "contents": [{                              \n    "parts":[{"text": "https://edition.cnn.com/2025/04/24/india/pahalgam-india-pakistan-attack-explainer-intl-hnk/index.html fetch title,summary of this page, and 10 key points."}]\n    }]\n   }',
            body: JSON.stringify({
                'contents': [
                    {
                        'parts': [
                            {
                                'text': `fetch data about this url :` + url+   ` give me response in an unformatted single line json: {title, summary, keyPoints}`
                            }
                        ]
                    }
                ]
            })
        });
        const response = await data.json();
        console.log('Response from Gemini API:', JSON.stringify(response));
        const jsonContent = response.candidates[0].content.parts[0].text;
        const {title,summary,keyPoints} = JSON.parse(jsonContent.split("\n")[1])
    
        const { data: insertData, error: insertError } = await supabase
            .from('urls')
            .insert([
                {
                    url, title, data: JSON.stringify({
                        summary,
                        keyPoints
                    })
                }
            ]);
        if (insertError) {
            console.error('Error inserting URL:', insertError);
            return NextResponse.json({ error: 'Error inserting URL' }, { status: 500 });
        }
        // return the data
        return NextResponse.json({
            message: 'URL added successfully',
            data: {
                url,
                title,
                summary,
                keyPoints
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

}

export async function GET(req) {
 
 
    // fetch the URL from the database
    const { data, error } = await supabase
        .from('urls')
        .select('*').order('created_at', { ascending: false });
        if(!data || data?.length === 0||!data[0]){
            return NextResponse.json({message:"No urls found"}, {status:404})
        };
    const parsedData = data?.map((item)=>{
        item.data = JSON.parse(item.data);
        return item;
    })
    if (error) {
        console.error('Error fetching URL:', error);
        return NextResponse.json({ error: 'Error fetching URL' }, { status: 500 });
    }
    return NextResponse.json(parsedData);
}
