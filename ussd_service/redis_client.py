"""
Redis client for USSD session management
"""
import redis
import json
from typing import Dict, Any, Optional
import os

class RedisClient:
    def __init__(self):
        # Use Redis from main docker-compose or local Redis
        redis_host = os.getenv('REDIS_HOST', 'localhost')
        redis_port = int(os.getenv('REDIS_PORT', 6379))
        
        try:
            self.redis_client = redis.Redis(
                host=redis_host,
                port=redis_port,
                db=1,  # Use different DB from main app
                decode_responses=True,
                socket_connect_timeout=2,
                socket_timeout=2
            )
            # Test connection
            self.redis_client.ping()
            print(f"✅ Connected to Redis at {redis_host}:{redis_port}")
        except Exception as e:
            print(f"⚠️  Redis connection failed: {e}")
            print("📱 USSD will work without session persistence")
            self.redis_client = None
    
    def set_session(self, session_id: str, data: Dict[str, Any], ttl: int = 300):
        """Set USSD session data with 5 minute TTL"""
        if self.redis_client:
            try:
                self.redis_client.setex(
                    f"ussd_session:{session_id}", 
                    ttl, 
                    json.dumps(data)
                )
            except Exception as e:
                print(f"Redis set error: {e}")
    
    def get_session(self, session_id: str) -> Optional[Dict[str, Any]]:
        """Get USSD session data"""
        if self.redis_client:
            try:
                data = self.redis_client.get(f"ussd_session:{session_id}")
                if data:
                    return json.loads(data)
            except Exception as e:
                print(f"Redis get error: {e}")
        return None
    
    def delete_session(self, session_id: str):
        """Delete USSD session"""
        if self.redis_client:
            try:
                self.redis_client.delete(f"ussd_session:{session_id}")
            except Exception as e:
                print(f"Redis delete error: {e}")
    
    def extend_session(self, session_id: str, ttl: int = 300):
        """Extend session TTL"""
        if self.redis_client:
            try:
                self.redis_client.expire(f"ussd_session:{session_id}", ttl)
            except Exception as e:
                print(f"Redis expire error: {e}")

# Global Redis client instance
redis_client = RedisClient()