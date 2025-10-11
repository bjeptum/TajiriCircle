from celery import Celery

# Create Celery app
app = Celery('tajiricircle')

# Configure Celery
app.config_from_object({
    'broker_url': 'redis://redis:6379/0',
    'result_backend': 'redis://redis:6379/0',
    'task_serializer': 'json',
    'accept_content': ['json'],
    'result_serializer': 'json',
    'timezone': 'UTC',
    'enable_utc': True,
})

@app.task
def test_task():
    """Simple test task"""
    return "Hello from Celery!"

# Auto-discover tasks
app.autodiscover_tasks()