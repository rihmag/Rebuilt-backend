// routes/analytics.js
import express from "express";
const router = express.Router();
import { PageVisit, TimeSpent } from "../models/pagevisitmodel.js";

// Track page visit
router.post('/visit', async (req, res) => {
  try {
    const { page, timestamp, userAgent, sessionId } = req.body;
    
    const pageVisit = new PageVisit({
      page,
      timestamp: timestamp || new Date(),
      userAgent,
      sessionId
    });
    
    await pageVisit.save();
    res.status(201).json({ message: 'Page visit tracked successfully' });
  } catch (error) {
    console.error('Error tracking page visit:', error);
    res.status(500).json({ error: 'Failed to track page visit' });
  }
});

// Track time spent on page
router.post('/time', async (req, res) => {
  try {
    const { page, timeSpent, timestamp, sessionId } = req.body;
    
    const timeRecord = new TimeSpent({
      page,
      timeSpent,
      timestamp: timestamp || new Date(),
      sessionId
    });
    
    await timeRecord.save();
    res.status(201).json({ message: 'Time spent tracked successfully' });
  } catch (error) {
    console.error('Error tracking time spent:', error);
    res.status(500).json({ error: 'Failed to track time spent' });
  }
});

// Get analytics for a specific page
router.get('/stats/:page', async (req, res) => {
  try {
    const { page } = req.params;
    
    const visits = await PageVisit.countDocuments({ page });
    const timeRecords = await TimeSpent.find({ page });
    
    const totalTime = timeRecords.reduce((sum, record) => sum + record.timeSpent, 0);
    const avgTime = timeRecords.length > 0 ? totalTime / timeRecords.length : 0;
    
    res.json({
      page,
      totalVisits: visits,
      averageTimeSpent: Math.round(avgTime),
      totalTimeSpent: totalTime
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Get all analytics
router.get('/stats', async (req, res) => {
  try {
    const visits = await PageVisit.aggregate([
      { $group: { _id: '$page', count: { $sum: 1 } } }
    ]);
    
    const timeStats = await TimeSpent.aggregate([
      {
        $group: {
          _id: '$page',
          avgTime: { $avg: '$timeSpent' },
          totalTime: { $sum: '$timeSpent' }
        }
      }
    ]);
    
    res.json({ visits, timeStats });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router;
