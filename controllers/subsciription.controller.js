import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    console.log('📝 Subscription created:', subscription._id);

    // ✅ Build the workflow URL
    const workflowUrl = `${SERVER_URL}/api/v1/workflows/subscription/reminder`;
    console.log('📤 Workflow URL:', workflowUrl);

    // ✅ Trigger the workflow
    const { workflowRunId } = await workflowClient.trigger({
      url: workflowUrl,
      body: {
        subscriptionId: subscription._id.toString(),
      },
      headers: {
        'content-type': 'application/json',
      },
      retries: 0,
    });

    console.log('✅ Workflow triggered:', workflowRunId);

    res.status(201).json({ 
      success: true, 
      data: subscription,
      workflowRunId  // ← Include this in response
    });
  } catch (error) {
    console.error('❌ Error creating subscription:', error);
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      const error = new Error('You are not the owner of this account');
      error.statusCode = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};