from datetime import datetime
from datetime import timedelta

import jwt
from rest_framework import exceptions


def create_refresh_token(id):
    token = jwt.encode(
        {
            'user_id': id,
            'exp': datetime.utcnow() + timedelta(days=7),
            'iat': datetime.utcnow(),
        },
        'refresh_secret',
        algorithm='HS256',
    )
    token_new = token.decode('utf-8')
    return token_new


def decode_refresh_token(token):
    try:
        payload = jwt.decode(token, 'refresh_secret', algorithms=['HS256'])
        return payload['user_id']

    except Exception:
        raise exceptions.AuthenticationFailed('unauthenticated')
