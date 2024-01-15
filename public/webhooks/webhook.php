<?php


require 'vendor/autoload.php';
use Illuminate\Support\Facades\Http;

$stripe = new \Stripe\StripeClient('sk_test_...');

$endpoint_secret = 'whsec_blCGU6k5ONMDgDNfwwFfPQpvh763aSAK';

$payload = @file_get_contents('php://input');
$sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
$event = null;

try {
    $event = \Stripe\Webhook::constructEvent(
        $payload,
        $sig_header,
        $endpoint_secret
    );
} catch (\UnexpectedValueException $e) {
    http_response_code(400);
    exit();
} catch (\Stripe\Exception\SignatureVerificationException $e) {
    http_response_code(400);
    exit();
}

// Handle the event
switch ($event->type) {
    case 'payment_intent.succeeded':
        $paymentIntent = $event->data->object;

        $userId = $_GET['user_id'] ?? null;

        if ($userId) {
            $response = Http::post("https://beemusic.pro.vn/webhooks/payment/success", [
                'user_id' => $userId,
            ]);

            $responseData = json_decode($response->body(), true);

            if ($responseData['success']) {
                echo "Payment success! User status updated.";
            } else {

                echo "Error updating user status after payment.";
            }
        } else {
            echo "User ID not provided.";
        }

        break;
    default:
        echo 'Received unknown event type ' . $event->type;
}

http_response_code(200);
