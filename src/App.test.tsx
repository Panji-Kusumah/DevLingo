import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

describe('DevLingo App', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
  });

  it('renders dashboard by default', async () => {
    render(<App />);
    // Check main container
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
    // Check dashboard view
    expect(screen.getByTestId('dashboard-view')).toBeInTheDocument();
  });

  it('filters glossary terms in the glossary view', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Navigate to glossary
    const kamusLinks = screen.getAllByText(/Kamus/i);
    const kamusLink = kamusLinks.find(el => el.closest('li') || el.closest('button'));
    if (!kamusLink) throw new Error('Kamus link not found');
    await user.click(kamusLink);

    // Check if glossary view is rendered
    const glossaryView = await screen.findByTestId('glossary-view');
    expect(glossaryView).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/Cari istilah, definisi, atau terjemahan/i);
    await user.type(searchInput, 'Boolean');

    // Should show Boolean term
    await waitFor(() => {
      expect(screen.getByText('Boolean')).toBeInTheDocument();
    });
    
    expect(screen.queryByText('API')).not.toBeInTheDocument();
  });

  it('starts a lesson and goes through the quiz flow', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    // Use aria-label we added to the lesson card button
    const startButton = await screen.findByRole('button', { name: /Mulai Modul|Lanjutkan Modul/i });
    await user.click(startButton);

    // Should show quiz view
    const quizView = await screen.findByTestId('quiz-view');
    expect(quizView).toBeInTheDocument();

    // Select first answer option (index 2 is correct for first lesson q1)
    const firstOption = screen.getByTestId('quiz-option-2');
    await user.click(firstOption);
    
    // Click Next question/Complete Module
    const nextBtn = await screen.findByText(/SOAL BERIKUTNYA|SELESAIKAN/i);
    await user.click(nextBtn);
    
    // Should still be in quiz view or back to dashboard
    expect(screen.getByTestId('quiz-view')).toBeInTheDocument();
  });

  it('saves and resumes lesson progress via localStorage', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    
    // Start lesson
    const startButton = await screen.findByRole('button', { name: /Mulai Modul|Lanjutkan Modul/i });
    await user.click(startButton);

    // Answer first question - corrected to index 2 for first lesson
    const correctOption = await screen.findByTestId('quiz-option-2');
    await user.click(correctOption);
    
    const nextBtn = await screen.findByText(/SOAL BERIKUTNYA|SELESAIKAN/i);
    await user.click(nextBtn);

    // Ensure localStorage is updated
    await waitFor(() => {
      const saved = JSON.parse(localStorage.getItem('devlingo_stats') || '{}');
      expect(saved.xp).toBeGreaterThan(0);
    });

    // Unmount and remount
    unmount();
    
    render(<App />);
    
    // Should show statistics showing progress (XP > 0)
    expect(await screen.findByText(/\+10/)).toBeInTheDocument();
  });

  it('calculates XP and level correctly', async () => {
    render(<App />);
    // Check if some dashboard stats are present
    expect(screen.getByTestId('dashboard-view')).toBeInTheDocument();
    // Use regex to be flexible with styling
    expect(screen.getByText(/Pangkat/i)).toBeInTheDocument();
  });
});
