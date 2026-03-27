import { NextRequest, NextResponse } from 'next/server';
import { supabaseServerClient } from '@/lib/database/supabase';

// GET all charts for user
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const supabase = supabaseServerClient();

    const { data, error } = await supabase
      .from('saved_charts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ charts: data });
  } catch (error) {
    console.error('Error fetching charts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch charts' },
      { status: 500 }
    );
  }
}

// POST save new chart
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, birthData, natalChart, notes } = body;

    const supabase = supabaseServerClient();

    const { data, error } = await supabase
      .from('saved_charts')
      .insert([
        {
          name,
          birth_data: birthData,
          natal_chart: natalChart,
          notes,
          is_public: false,
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ chart: data }, { status: 201 });
  } catch (error) {
    console.error('Error saving chart:', error);
    return NextResponse.json(
      { error: 'Failed to save chart' },
      { status: 500 }
    );
  }
}

// PUT update chart
export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, name, notes } = body;

    const supabase = supabaseServerClient();

    const { data, error } = await supabase
      .from('saved_charts')
      .update({
        name,
        notes,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ chart: data });
  } catch (error) {
    console.error('Error updating chart:', error);
    return NextResponse.json(
      { error: 'Failed to update chart' },
      { status: 500 }
    );
  }
}

// DELETE chart
export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const chartId = searchParams.get('id');

    if (!chartId) {
      return NextResponse.json({ error: 'Chart ID required' }, { status: 400 });
    }

    const supabase = supabaseServerClient();

    const { error } = await supabase
      .from('saved_charts')
      .delete()
      .eq('id', chartId);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting chart:', error);
    return NextResponse.json(
      { error: 'Failed to delete chart' },
      { status: 500 }
    );
  }
}
